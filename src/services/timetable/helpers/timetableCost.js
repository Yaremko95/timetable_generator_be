const User = require("../../../db/UserSchema");
const Class = require("../schemas/ClassSchema");
const GroupClass = require("../schemas/GroupClass");
const ClassRoom = require("../schemas/ClassRoomSchema");
const Group = require("../schemas/GroupSchema");
const Timetable = require("../schemas/TimeTableSchema");
const TeacherEmptySpace = require("../schemas/TeacherEmptySpace");
const TimetableFreeSpace = require("../schemas/TimetableFreeSpace");
const ClassFilledSpace = require("../schemas/ClassFilledSpace");
const { Op, Sequelize } = require("sequelize");
//const { validTeacherGroupRaw } = require("./timetable.ustils");
const hardConstraintCost = (free, classes) => {
  // console.log(free);
  const costClass = {};
  classes.forEach((c) => {
    costClass[c.id] = 0;
  });
  let costClassrooms = 0;
  let costTeacher = 0;
  let costGroup = 0;
  let t = 0;
  free.forEach((slot) => {
    if (slot.isFree === false) {
      const c1 = classes.find((item) => item.id === slot.freeSpace.classId);
      if (
        !c1.classrooms.find((classroom) => classroom.id === slot.classroomId)
      ) {
        costClassrooms++;
        costClass[c1.id]++;
      }

      const raw = free.filter(
        (item) => item.id !== slot.id && item.free_space === slot.free_space
      );

      raw.forEach((elInRaw) => {
        if (elInRaw.isFree === false) {
          const c2 = classes.find(
            (item) => item.id === elInRaw.freeSpace.classId
          );

          if (c1.teacherId === c2.teacherId) {
            costTeacher++;
            costClass[c1.id]++;
          }
          const g1 = c1.groups;
          const g2 = c2.groups;

          g1.forEach((g) => {
            if (g2.find((item) => item.id === g.id)) {
              costGroup++;
              costClass[c1.id]++;
            }
          });
        }
      });
    }
  });
  const totalCost = costTeacher + costClassrooms + costGroup;
  //console.log(costClass, costTeacher, costClassrooms, costGroup);
  return [totalCost, costClass, costTeacher, costClassrooms, costGroup];
};

const checkHardConstraints = (free, classes) => {
  let overlaps = 0;
  free.forEach((slot) => {
    if (slot.isFree === false) {
      const c1 = classes.find((item) => item.id === slot.freeSpace.classId);
      if (
        !c1.classrooms.find((classroom) => classroom.id === slot.classroomId)
      ) {
        overlaps++;
      }

      const raw = free.filter(
        (item) => item.id !== slot.id && item.free_space === slot.free_space
      );

      raw.forEach((elInRaw) => {
        if (elInRaw.isFree === false) {
          const c2 = classes.find(
            (item) => item.id === elInRaw.freeSpace.classId
          );

          if (c1.teacherId === c2.teacherId) {
            overlaps++;
          }
          const g1 = c1.groups;
          const g2 = c2.groups;

          g1.forEach((g) => {
            if (g2.find((item) => item.id === g.id)) {
              overlaps++;
            }
          });
        }
      });
    }
  });
  return overlaps;
};

module.exports = { hardConstraintCost, checkHardConstraints };
