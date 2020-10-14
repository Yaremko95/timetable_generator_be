const User = require("../../users/UserSchema");
const Class = require("../schemas/ClassSchema");
const GroupClass = require("../schemas/GroupClass");
const ClassRoom = require("../schemas/ClassRoomSchema");
const Group = require("../schemas/GroupSchema");
const Timetable = require("../schemas/TimeTableSchema");
const TeacherEmptySpace = require("../schemas/TeacherEmptySpace");
const TimetableFreeSpace = require("../schemas/TimetableFreeSpace");
const ClassFilledSpace = require("../schemas/ClassFilledSpace");
const { Op, Sequelize } = require("sequelize");
const { hardConstraintCost, checkHardConstraints } = require("./timetableCost");

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const setToDefault = async (timetableId) => {
  try {
    let result = await TimetableFreeSpace.update(
      { isFree: true },
      {
        where: {
          timetableId,
        },
        raw: true,
        returning: true,
      }
    );
    result = result[1].map((e) => ({ freeSpaceId: e.id }));
    await ClassFilledSpace.destroy({
      where: {
        [Op.or]: result,
      },
    });
    // await TeacherEmptySpace.update(
    //   { empty_space: [] },
    //   { where: { timetableId } }
    // );
    // await Group.update({ empty_space: [] }, { where: { timetableId } });
  } catch (e) {}
};

const getTimetable = async (timetableId) => {
  try {
    const free = await TimetableFreeSpace.findAll({
      where: { timetableId },
      include: [{ model: ClassFilledSpace, as: "freeSpace", required: false }],
      order: [
        ["classroomId", "ASC"],
        ["free_space", "ASC"],
      ],
    });
    const classes = await Class.findAll({
      where: { timetableId },
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "name", "surname", "email"],
        },
        {
          model: ClassFilledSpace,
          as: "filled",
          include: [{ model: TimetableFreeSpace, as: "freeSpace" }],
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
    });
    const timetable = await Timetable.findOne({
      where: { id: timetableId },

      include: [
        {
          model: Group,
          as: "groups",
        },
        {
          model: ClassRoom,
          as: "classrooms",
        },
      ],
    });
    // console.log(timetable.get({ plain: true }));
    return { ...timetable.get({ plain: true }), free: free, classes: classes };
  } catch (e) {
    console.log(e);
  }
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const populateTimetable = async (timetable) => {
  try {
    const { classes, free, teacher_empty_space, groups } = timetable;
    const shuffledClasses = shuffle(classes);
    //console.log(shuffledClasses);
    for (let index = 0; index < shuffledClasses.length; index++) {
      const cl = shuffledClasses[index];
      let ind = 0;
      while (true) {
        const startField = free[ind];
        if (startField.isFree === false) {
          ind++;
          continue;
        }
        const startTime = startField.free_space;
        const endTime = startTime + cl.duration - 1;
        const hrsDay = timetable.total_hours / timetable.total_days;
        console.log(hrsDay, "populate");
        if (startTime % hrsDay > endTime % hrsDay) {
          ////refactor
          ind++;
          continue;
        }

        let found = true;
        for (let i = 1; i < cl.duration; i++) {
          if (
            !free.find(
              (slot) =>
                slot.free_space === i + startTime &&
                slot.classroomId === startField.classroomId &&
                slot.isFree === true
            )
          ) {
            found = false;
            ind++;
            break;
          }
        }
        if (!cl.classrooms.find((item) => item.id === startField.classroomId)) {
          ind++;
          continue;
        }
        if (found) {
          // let teacherEmptySpace = teacher_empty_space.find(
          //   (item) => item.teacherId === cl.teacherId
          // );
          // await asyncForEach(cl.groups, async (group) => {
          //   for (let i = 0; i < cl.duration; i++) {
          //     group.empty_space.push(i + startTime);
          //   }
          //   await Group.update(
          //     { empty_space: group.empty_space },
          //     { where: { id: group.id } }
          //   );
          // });
          for (let i = 0; i < cl.duration; i++) {
            let filledSpot = await TimetableFreeSpace.update(
              { isFree: false },
              {
                where: {
                  classroomId: startField.classroomId,
                  free_space: i + startTime,
                },
                raw: true,
                returning: true,
              }
            );

            const newFilledSpace = await ClassFilledSpace.create({
              classId: cl.id,
              freeSpaceId: filledSpot[1][0].id,
            });
            free.forEach((slot) => {
              if (
                slot.classroomId === startField.classroomId &&
                slot.free_space === i + startTime &&
                slot.id === filledSpot[1][0].id
              ) {
                slot.isFree = false;
                slot.freeSpace = newFilledSpace.get({ plain: true });
              }
            });
            //console.log(newFilledSpace.get({ plain: true }));
            classes.forEach((c) => {
              if (cl.id === c.id)
                c.filled.push(newFilledSpace.get({ plain: true }));
            });
            //console.log(cl.dataValues);
            //teacherEmptySpace.empty_space.push(i + startTime);
          }
          // await TeacherEmptySpace.update(
          //   { empty_space: teacherEmptySpace.empty_space },
          //   { where: { id: teacherEmptySpace.id } }
          // );
          break;
        }
      }
    }
    return { classes, free };
  } catch (e) {
    console.log(e);
  }
};

const sortByValue = (arr) => {
  const items = Object.keys(arr).map(function (key) {
    return [parseInt(key), arr[key]];
  });

  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items;
};
const validTeacherGroupRaw = (free, classes, indClass, time) => {
  let isValid = true;
  const c1 = classes.find((item) => item.id === indClass);
  const raw = free.filter((slot) => slot.free_space === time);

  raw.forEach((slot) => {
    if (slot.isFree === false) {
      const c2 = classes.find((item) => item.id === slot.freeSpace.classId);
      if (c1.teacher === c2.teacher) {
        isValid = false;
        return isValid;
      }
      const g1 = c1.groups;
      const g2 = c2.groups;

      g1.forEach((g) => {
        if (g2.find((item) => item.id === g.id)) {
          isValid = false;
          return isValid;
        }
      });
    }
  });
  return isValid;
};

const mutateValidSpot = async (free, classes, indClass, hrsDay) => {
  const classs = classes.find((c) => c.id === indClass);
  const fields = classs.filled;
  let ind = 0;
  while (true) {
    if (ind >= free.length) {
      return;
    }
    const startField = free[ind];
    if (startField.isFree === false) {
      ind++;
      continue;
    }

    const startTime = startField.free_space;
    const endTime = startTime + classs.duration - 1;
    console.log(hrsDay, "mutateToAvailableSlot");
    if (startTime % hrsDay > endTime % hrsDay) {
      ////refactor
      ind++;
      continue;
    }

    if (!classs.classrooms.find((item) => item.id === startField.classroomId)) {
      ind++;
      continue;
    }
    let found = true;
    for (let i = 0; i < classs.duration; i++) {
      const time = i + startTime;
      const isValid = validTeacherGroupRaw(free, classes, indClass, time);

      if (
        !free.find(
          (slot) =>
            slot.free_space === time &&
            slot.classroomId === startField.classroomId &&
            slot.isFree === true
        ) ||
        !isValid
      ) {
        found = false;
        ind++;
        break;
      }
    }

    if (found) {
      await TimetableFreeSpace.update(
        { isFree: true },
        {
          where: {
            [Op.or]: fields.map((e) => ({ id: e.freeSpaceId })),
          },
          raw: true,
          returning: true,
        }
      );
      free.forEach((slot) => {
        if (fields.find((e) => e.freeSpaceId === slot.id)) {
          slot.isFree = true;
        }
      });
      await ClassFilledSpace.destroy({
        where: {
          [Op.or]: fields.map((e) => ({ id: e.id })),
        },
      });
      classes.forEach((cl) => {
        if (cl.id === classs.id) cl.filled = [];
      });

      for (let i = 0; i < classs.duration; i++) {
        let filledSpot = await TimetableFreeSpace.update(
          { isFree: false },
          {
            where: {
              classroomId: startField.classroomId,
              free_space: i + startTime,
            },
            raw: true,
            returning: true,
          }
        );

        const newFilledSpace = await ClassFilledSpace.create({
          classId: classs.id,
          freeSpaceId: filledSpot[1][0].id,
        });
        free.forEach((slot) => {
          if (
            slot.classroomId === startField.classroomId &&
            slot.free_space === i + startTime &&
            slot.id === filledSpot[1][0].id
          ) {
            slot.isFree = false;
            slot.freeSpace = newFilledSpace.get({ plain: true });
          }
        });
        classes.forEach((cl) => {
          if (cl.id === classs.id)
            cl.filled.push(newFilledSpace.get({ plain: true }));
        });
      }
      break;
    }
  }
};

const evolutionaryAlgorithm = async (classes, free, hrsDay) => {
  try {
    const n = 3;
    let sigma = 2;
    const runTimes = 5;
    const maxStagnation = 200;
    let f = 0;

    for (let run = 0; run < runTimes; run++) {
      console.log("run ", run + 1, "sigma ", sigma);
      let t = 0;
      let stagnation = 0;
      let costStats = 0;
      while (stagnation < maxStagnation) {
        const [
          lossBefore,
          costClass,
          costTeacher,
          costClassrooms,
          costGroup,
        ] = hardConstraintCost(free, classes);
        const check = checkHardConstraints(free, classes);
        if (lossBefore === 0 && check === 0) {
          break;
        }
        const costList = sortByValue(costClass);
        for (let i = 0; i < Math.floor(costList.length / 4); i++) {
          if (Math.random() * (1 - 0) + 0 < sigma && costList[i][1] !== 0) {
            await mutateValidSpot(free, classes, costList[i][0], hrsDay);
          }
        }
        const [
          lossAfter,
          cost_class,
          cost_teacher,
          cost_classroom,
          cost_group,
        ] = hardConstraintCost(free, classes);
        if (lossAfter < lossBefore) {
          stagnation = 0;
          costStats++;
        } else {
          stagnation += 1;
        }
        t++;
        if (t >= 10 * n && t % n === 0) {
          const s = costStats;
          if (s < 2 * n) {
            sigma *= 0.85;
          } else {
            sigma /= 0.85;
          }
          costStats = 0;
        }
      }
    }
  } catch (e) {}
};
const findAvailableSlots = (timetable, indClass, hrsDay) => {
  try {
    const { free, classes } = timetable;
    const c1 = classes.find((c) => c.id === indClass);

    let classAvailableSpace = free
      .filter((slot) => slot.isFree === true)
      .sort((first, second) => first.free_space - second.free_space);

    classes.forEach((c2) => {
      if (
        c2.id !== c1.id &&
        (c1.teacher === c2.teacher ||
          c2.groups.some((g2) => c1.groups.find((g1) => g1.id === g2.id)))
      ) {
        c2.filled.forEach((slot) => {
          const inFree = free.find((f) => f.id === slot.freeSpaceId);

          classAvailableSpace = classAvailableSpace.filter(
            (field) =>
              field.free_space !== inFree.free_space &&
              c1.classrooms.some(
                (classroom) => classroom.id === field.classroomId
              )
          );
        });
      }
    });

    const temp = [];
    for (let i = 0; i < classAvailableSpace.length - c1.duration + 1; i++) {
      const startTime = classAvailableSpace[i].free_space;
      const endTime = classAvailableSpace[i + c1.duration - 1].free_space;
      //const hrsDay = timetable.total_hours / timetable;
      if (
        endTime - startTime === c1.duration - 1 &&
        startTime % hrsDay <= endTime % hrsDay
      ) {
        const list = [];
        for (let j = 0; j < c1.duration; j++) {
          list.push(classAvailableSpace[i + j]);
        }
        temp.push(list);
      }
    }
    classAvailableSpace = temp;
    return classAvailableSpace;
  } catch (e) {
    console.log(e);
  }
};
const validSlotsCost = (free, classes, indClass, newSlots) => {
  let isValid = true;
  const c1 = classes.find((item) => item.id === indClass);

  newSlots.forEach((field) => {
    const raw = free.filter((slot) => slot.free_space === field.free_space);

    raw.forEach((slot) => {
      if (slot.isFree === false && slot.freeSpace.classId !== c1.id) {
        const c2 = classes.find((item) => item.id === slot.freeSpace.classId);
        if (c1.teacher === c2.teacher) {
          isValid = false;
          return isValid;
        }
        const g1 = c1.groups;
        const g2 = c2.groups;

        g1.forEach((g) => {
          if (g2.find((item) => item.id === g.id)) {
            isValid = false;
            return isValid;
          }
        });
      }
    });
  });
  return isValid;
};
const mutateToAvailableSlot = async (free, classes, indClass, newSlotsList) => {
  try {
    const options = newSlotsList.map((slot) => ({ id: slot.id }));
    const cl = classes.find((c) => c.id === indClass);
    await TimetableFreeSpace.update(
      { isFree: true },
      {
        where: {
          [Op.or]: cl.filled.map((slot) => ({ id: slot.freeSpaceId })),
        },
        raw: true,
        returning: true,
      }
    );

    await ClassFilledSpace.destroy({
      where: {
        [Op.or]: cl.filled.map((e) => ({ id: e.id })),
      },
    });

    let result = await TimetableFreeSpace.update(
      { isFree: false },
      {
        where: {
          [Op.or]: options,
        },
        raw: true,
        returning: true,
      }
    );

    result = result[1].map((e) => e.id);

    for (let i = 0; i < result.length; i++) {
      await ClassFilledSpace.create({
        classId: cl.id,
        freeSpaceId: result[i],
      });
    }
  } catch (e) {}
};
const setDate = (day, h, min) => {
  const date = new Date();
  date.setHours(h, min);
  const currentDay = date.getDay();
  const distance = day - currentDay;
  date.setDate(date.getDate() + distance);

  return date.toString();
};
module.exports = {
  setToDefault,
  getTimetable,
  populateTimetable,
  evolutionaryAlgorithm,
  mutateValidSpot,
  shuffle,
  findAvailableSlots,
  validSlotsCost,
  mutateToAvailableSlot,
  setDate,
};
