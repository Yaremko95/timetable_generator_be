// const db = require("../../../db");
// const Sequelize = require("sequelize");
// const User = require("../../users/UserSchema");
// const Timetable = require("./TimeTableSchema");
// const Group = require("./GroupSchema");
// const Classroom = require("./ClassRoomSchema");
// const Class = require("./ClassSchema");
module.exports = (sequelize, Sequelize) => {
  const ClassroomClass = sequelize.define(
    "ClassroomClasses",
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
  return ClassroomClass;
};
