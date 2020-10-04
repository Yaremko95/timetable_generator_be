const express = require("express");

const router = express.Router();
const User = require("../users/UserSchema");
const Class = require("./schemas/ClassSchema");
const GroupClass = require("./schemas/GroupClass");
const {
  teachers,
  groups,
  classrooms,
  classes,
} = require("../loadData/testData");
const ClassRoom = require("./schemas/ClassRoomSchema");
const Group = require("./schemas/GroupSchema");
const Timetable = require("./schemas/TimeTableSchema");
const TeacherEmptySpace = require("./schemas/TeacherEmptySpace");
const TimetableFreeSpace = require("./schemas/TimetableFreeSpace");
const UserGroup = require("./schemas/UserGroup");
const ClassFilledSpace = require("./schemas/ClassFilledSpace");
const {
  setToDefault,
  getTimetable,
  populateTimetable,
  evolutionaryAlgorithm,
  findAvailableSlots,
  validSlotsCost,
  mutateToAvailableSlot,
  setDate,
} = require("./helpers/timetable.ustils");
const { hardConstraintCost } = require("./helpers/timetableCost");
const { Op, Sequelize } = require("sequelize");
router.route("/timetable/:id").get(async (req, res, next) => {
  try {
    const timetable = await getTimetable(req.params.id);
    const [
      totalCost,
      costClass,
      costTeacher,
      costClassrooms,
      costGroup,
    ] = hardConstraintCost(
      timetable.free,
      timetable.classes,
      timetable.classrooms
    );
    res.send(timetable);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
router.route("/classes/teacher/:userId").get(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const classes = await Timetable.findAll({
      include: [
        {
          model: Group,
          as: "groups",
          include: [
            {
              model: User,
              as: "students",
            },
          ],
        },
        {
          model: ClassRoom,
          as: "classrooms",
        },
        {
          model: Class,
          as: "classes",
          where: { [Op.or]: [{ teacherId: userId }] },
          include: [
            {
              model: User,
              as: "teacher",
              attributes: ["id", "name", "surname", "email"],
            },
            {
              model: ClassFilledSpace,
              as: "filled",
            },
            {
              model: Group,
              as: "groups",
              through: {
                attributes: [],
              },
            },
            {
              model: ClassRoom,
              as: "classrooms",
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    res.send(classes);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/classes/student/:userId").get(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Group,
          include: [
            {
              model: Class,
              as: "classes",
              through: { attributes: [] },
              include: [
                {
                  model: User,
                  as: "teacher",
                  attributes: ["id", "name", "surname", "email"],
                },
                {
                  model: ClassFilledSpace,
                  as: "filled",
                },
                {
                  model: Group,
                  as: "groups",

                  through: {
                    attributes: [],
                  },
                  include: [
                    {
                      model: User,
                      as: "students",
                    },
                  ],
                },
                {
                  model: ClassRoom,
                  as: "classrooms",
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    res.send(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.route("/timetable/:id").delete(async (req, res, next) => {
  try {
    await Timetable.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("ok");
  } catch (e) {
    console.log(e);
  }
});

router.route("/loadClasses").post(async (req, res, next) => {
  try {
    let test = [
      {
        subject: "web ",
        teacher: "Diego Banovaz",
        groups: ["401", "22"],
        classrooms: ["c"],
        duration: "2",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        teacher: "Milojkovic Branislav",
        groups: ["402"],
        classrooms: ["c"],
        duration: "3",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        teacher: "Diego Banovaz",
        groups: ["401", "402", "405"],
        classrooms: ["d"],
        duration: "3",
      },
      // {
      //   subject: "Softversko inzenjerstvo",
      //
      //   teacher: "Markovic Ana",
      //   groups: ["402"],
      //   classrooms: "d",
      //   duration: "4",
      // },
    ];
    const weekDays = [1, 2, 4, 5];

    const [timetable, timetableCreated] = await Timetable.findOrCreate({
      where: { title: "strive4" },
      defaults: {
        title: "strive4",
        adminId: 55,
        total_hours: 20,
        total_days: 4,
        // start_time: setDate(8, 30),
      },
    });
    // const timetable = await Timetable.create({
    //   title: "strive12",
    //   adminId: 55,
    //   total_hours: 60,
    // });
    // console.log(timetable);
    for (let i = 0; i < test.length; i++) {
      const [user, userCreated] = await User.findOrCreate({
        where: {
          email: test[i].teacher
            .toLowerCase()
            .split(" ")
            .join("")
            .concat("@gmail.com"),
        },
        defaults: {
          name: test[i].teacher.split(" ")[0],
          surname: test[i].teacher.split(" ")[1],
          role: "teacher",
        },
      });
      const [
        teacherEmptySpace,
        teacherEmptySpaceCreated,
      ] = await TeacherEmptySpace.findOrCreate({
        where: {
          teacherId: user.id,
          timetableId: timetable.id,
        },
        defaults: {
          teacherId: user.id,
          timetableId: timetable.id,
          empty_space: [],
        },
      });
      const groupsId = [];
      for (let g = 0; g < test[i].groups.length; g++) {
        const [group, groupCreated] = await Group.findOrCreate({
          where: { title: test[i].groups[g], timetableId: timetable.id },
          defaults: { title: test[i].groups[g], timetableId: timetable.id },
        });
        groupsId.push(group.id);
      }
      const classroomsId = [];
      for (let c = 0; c < test[i].classrooms.length; c++) {
        const [classroom, classroomCreated] = await ClassRoom.findOrCreate({
          where: { title: test[i].classrooms[c], timetableId: timetable.id },
          defaults: { title: test[i].classrooms[c], timetableId: timetable.id },
        });
        console.log(
          (13 % (timetable.total_days / weekDays.length - 1)) + 8 + 13
        );
        if (classroomCreated) {
          for (let time = 0; time < parseInt(timetable.total_hours); time++) {
            // console.log(
            //   Math.floor(time / (timetable.total_days / weekDays.length))
            // );
            // console.log((i % (20 / 4)) + 8);
            //
            // console.log(Math.floor(i / (20 / 4)));
            await TimetableFreeSpace.create({
              timetableId: timetable.id,
              classroomId: classroom.id,
              free_space: time,
              isFree: true,
              date: setDate(
                weekDays[
                  Math.floor(time / (timetable.total_hours / weekDays.length))
                ],
                (time % (timetable.total_hours / weekDays.length)) + 8,
                30
              ),
            });
          }
        }
        classroomsId.push(classroom.id);
      }
      Class.create({
        subject: test[i].subject,
        duration: test[i].duration,
        teacherId: user.id,
        timetableId: timetable.id,
      }).then(async (newClass) => {
        newClass.addGroups(groupsId);
        newClass.addClassrooms(classroomsId);
      });
    }
    res.send("ok");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.route("/loadUsers").post(async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

router.route("/generate/:timetableId").get(async (req, res, next) => {
  try {
    const { timetableId } = req.params;
    await setToDefault(timetableId);
    const timetable = await getTimetable(timetableId);
    const { classes, free } = await populateTimetable(timetable);
    await evolutionaryAlgorithm(classes, free);
    //const newtimetable = await getTimetable(timetableId);
    res.send("ok");
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/findAvailableSpace/:timetableId/:classId")
  .get(async (req, res, next) => {
    try {
      const { classId, timetableId } = req.params;
      const timetable = await getTimetable(timetableId);

      const classAvailableSpace = findAvailableSlots(
        timetable,
        parseInt(classId)
      );
      res.send(classAvailableSpace);
    } catch (e) {}
  });

router
  .route("/mutateToAvailable/:timetableId/:classId")
  .post(async (req, res, next) => {
    try {
      const { classId, timetableId } = req.params;
      const timetable = await getTimetable(timetableId);
      const { free, classes } = timetable;
      const { slots } = req.body;
      if (!validSlotsCost(free, classes, parseInt(classId), slots)) {
        const err = new Error("Not valid time");
        err.httpStatusCode = 400;
        next(err);
      } else {
        await mutateToAvailableSlot(free, classes, parseInt(classId), slots);
        res.send("ok");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
