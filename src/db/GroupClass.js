// const orm = require("../../../db");
// const Sequelize = require("sequelize");
// const User = require("../../users/UserSchema");
// const Timetable = require("./TimeTableSchema");
// const Group = require("./GroupSchema");
// const Classroom = require("./ClassRoomSchema");
// const Class = require("./ClassSchema");
// const db = require("../../db");
// const Group = db.groups;
// const Class = db.classes;
// const Timetable = db.timetables
// const Classroom = db.classrooms
module.exports = (sequelize, Sequelize) => {
  const GroupClass = sequelize.define(
    "GroupClasses",
    {
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      //   allowNull: false,
      // },
    },
    { timestamps: false }
  );
  return GroupClass;
};
