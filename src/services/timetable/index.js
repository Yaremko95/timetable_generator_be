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
//const UserGroup = require("./schemas/UserGroup");
const Json2csvParser = require("json2csv").Parser;
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
router.route("/loadTestDataToJson").post(async (req, res, next) => {
  try {
  } catch (e) {}
});
router.route("/:id").get(async (req, res, next) => {
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
    //console.log(totalCost);
    console.log(totalCost);
    res.send(timetable);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
router.route("/:id").delete(async (req, res, next) => {
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
router.route("/classes/:userId").get(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    const groupWhere = user.groupId ? { id: user.groupId } : {};
    const classWhere = !user.groupId ? { teacherId: user.id } : {};
    const classes = await Timetable.findAll(
      //{ where: { ["groups.students.id"]: userId } },
      {
        include: [
          {
            model: Group,
            as: "groups",
            where: groupWhere,
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
            where: classWhere,
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
      }
    );

    res.send(classes);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
// router.route("/classes/student/:userId").get(async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findOne({
//       where: { id: userId },
//       include: [
//         {
//           model: Group,
//           include: [
//             {
//               model: Class,
//               as: "classes",
//               through: { attributes: [] },
//               include: [
//                 {
//                   model: User,
//                   as: "teacher",
//                   attributes: ["id", "name", "surname", "email"],
//                 },
//                 {
//                   model: ClassFilledSpace,
//                   as: "filled",
//                 },
//                 {
//                   model: Group,
//                   as: "groups",
//
//                   through: {
//                     attributes: [],
//                   },
//                   include: [
//                     {
//                       model: User,
//                       as: "students",
//                     },
//                   ],
//                 },
//                 {
//                   model: ClassRoom,
//                   as: "classrooms",
//                   through: {
//                     attributes: [],
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//         {},
//       ],
//     });
//
//     res.send(user);
//   } catch (e) {
//     console.log(e);
//     next(e);
//   }
// });

router.route("/users/toCsv").post(async (req, res) => {
  try {
    // const data = await ExperienceSchema.find({ username: req.params.userName });
    const teachersData = teachers;
    const list = [];
    Object.keys(teachersData).forEach((user) => {
      const newUser = {
        email: user.toLowerCase().split(" ").join("").concat("@gmail.com"),
        name: user.split(" ")[0],
        surname: user.split(" ")[1],
        role: "teacher",
      };
      list.push(newUser);
    });

    const jsonData = JSON.parse(JSON.stringify(list));
    //  console.log(jsonData);
    const csvFields = ["name", "surname", "email", "role"];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csvData = json2csvParser.parse(jsonData);
    res.setHeader("Content-disposition", "attachment; filename=teachers.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).end(csvData);
  } catch (e) {
    console.log(e);
  }
});

router.route("/loadClasses").post(async (req, res, next) => {
  try {
    // let testClasses = classes.splice(0, 5);
    //let test = classes;
    let test = [
      {
        subject: "web ",
        teacher: "Diego Banovaz",
        groups: ["401", "22"],
        classrooms: ["U1"],
        duration: "2",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        teacher: "Milojkovic Branislav",
        groups: ["402"],
        classrooms: ["U1"],
        duration: "3",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        teacher: "Diego Banovaz",
        groups: ["401", "402", "405"],
        classrooms: ["U2"],
        duration: "3",
      },
      {
        subject: "Softversko inzenjerstvo",

        teacher: "Markovic Ana",
        groups: ["402"],
        classrooms: ["U2"],
        duration: "3",
      },
      {
        subject: "Programski prevodioci",

        teacher: "Vujosevic Dusan",
        groups: [
          "301",
          "302",
          "303",
          "304",
          "305",
          "306",
          "307",
          "308",
          "309",
          "309a",
        ],
        classrooms: ["U1"],
        duration: "2",
      },
      {
        subject: "Interakcija covek racunar",

        teacher: "Vujosevic Dusan",
        groups: [
          // "301",
          // "302",
          // "303",
          // "304",
          // "305",
          // "306",
          // "307",
          // "308",
          "309",
          "309a",
          "2s1",
          "2s2",
        ],
        classrooms: ["U1"],
        duration: "2",
      },
      {
        subject: "Masinsko ucenje",

        teacher: "Ilic Nemanja",
        groups: ["301", "302", "306", "308"],
        classrooms: ["U1"],
        duration: "2",
      },
      {
        subject: "Interakcija covek racunar",

        teacher: "Radosavljevic Nemanja",
        groups: ["301", "303", "304", "305"],
        classrooms: ["U1", "U2"],
        duration: "2",
      },
      {
        subject: "WEB programiranje",

        teacher: "Vidakovic MIlan",
        groups: ["309", "314", "319", "322"],
        classrooms: ["U1", "U2"],
        duration: "2",
      },
      {
        subject: "WEB programiranje",

        teacher: "Gavrilovic Vuk",
        groups: ["301", "303", "304", "307", "322"],
        classrooms: ["U1", "U2"],
        duration: "2",
      },
      {
        subject: "Programski prevodioci",

        teacher: "Stankovic Ivana",
        groups: ["301", "305", "308"],
        classrooms: ["U2"],
        duration: "2",
      },
      {
        subject: "Softverske komponente",
        teacher: "Dimic Surla Bojana",
        groups: ["301", "307", "309a"],
        classrooms: ["U1"],
        duration: "2",
      },
      {
        subject: "Graficki dizajn 2",
        tip: "P",
        teacher: "Malesevic Nenad",
        groups: ["3d1"],
        classrooms: ["U1", "U3"],
        duration: "3",
      },
      {
        subject: "Graficki dizajn 2",
        tip: "V",
        teacher: "Malesevic Nenad",
        groups: ["3d1"],
        classrooms: ["U3"],
        duration: "3",
      },
      {
        subject: "Muzicka produkcija 3",
        tip: "P",
        teacher: "Ognjanovic Ivana",
        groups: ["3d1"],
        classrooms: ["U3"],
        duration: "3",
      },
      {
        subject: "Muzicka produkcija 3",
        tip: "V",
        teacher: "Ognjanovic Ivana",
        groups: ["3d1"],
        classrooms: ["U3"],
        duration: "3",
      },
      {
        subject: "Racunarska animacija",
        tip: "P",
        teacher: "Djuric Milan",
        groups: ["3d1"],
        classrooms: ["U1", "U2"],
        duration: "3",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        tip: "V",
        teacher: "Milojkovic Branislav",
        groups: ["401"],
        classrooms: ["U3"],
        duration: "3",
      },
      {
        subject: "Softversko inzenjerstvo",
        tip: "V",
        teacher: "Markovic Ana",
        groups: ["401"],
        classrooms: ["U3", "U2"],
        duration: "3",
      },
      {
        subject: "Softversko inzenjerstvo",
        tip: "P",
        teacher: "Perisic Branko",
        groups: ["401", "402"],
        classrooms: ["U1", "U3"],
        duration: "3",
      },
      {
        subject: "Teorija algoritama, automata i jezika",
        tip: "P",
        teacher: "Jovanovic Jelena",
        groups: ["401", "402"],
        classrooms: ["U1", "U3"],
        duration: "3",
      },
      {
        subject: "Teorija algoritama, automata i jezika",
        tip: "V",
        teacher: "Tomic Milan",
        groups: ["401", "402"],
        classrooms: ["U1", "U3"],
        duration: "3",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        tip: "P",
        teacher: "Milinkovic Stevan",
        groups: ["401", "402", "405"],
        classrooms: ["U1", "U2"],
        duration: "3",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        tip: "V",
        teacher: "Milojkovic Branislav",
        groups: ["402"],
        classrooms: ["U3", "U1"],
        duration: "3",
      },
      {
        subject: "Softversko inzenjerstvo",
        tip: "V",
        teacher: "Markovic Ana",
        groups: ["402"],
        classrooms: ["U3", "U1"],
        duration: "3",
      },
      {
        subject: "Konkurentni i distribuirani sistemi",
        tip: "V",
        teacher: "Milojkovic Branislav",
        groups: ["405"],
        classrooms: ["U3", "U2"],
        duration: "3",
      },
      {
        subject: "Digitalna obrada signala",
        tip: "P",
        teacher: "Babic Djorde",
        groups: ["405"],
        classrooms: ["U3"],
        duration: "3",
      },
    ];
    const weekDays = [1, 2, 3, 4, 5];

    const [timetable, timetableCreated] = await Timetable.findOrCreate({
      where: { title: "Strive School" },
      defaults: {
        title: "Strive School",
        adminId: 140,
        total_hours: 60,
        total_days: 5,
        // start_time: setDate(8, 30),
      },
    });

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
      // console.log(user);
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
      }).then((newClass) => {
        // console.log(newClass);
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
    const hrsDay = timetable.total_hours / timetable.total_days;

    await evolutionaryAlgorithm(classes, free, hrsDay);
    const newtimetable = await getTimetable(timetableId);
    console.log(hrsDay);
    //console.log(newtimetable);
    res.send(newtimetable);
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
        parseInt(classId),
        timetable.total_hours / timetable.total_days
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
