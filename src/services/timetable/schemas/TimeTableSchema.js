const orm = require("../../../db");
const Sequelize = require("sequelize");
//const User = require("../../users/UserSchema");
//const Class = require("./ClassSchema");
//const TeacherEmptySpace = require("./TeacherEmptySpace");
//const Group = require("./GroupSchema");
const Timetable = orm.define(
  "timetables",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
    },
    total_hours: {
      type: Sequelize.NUMBER,
      required: true,
    },
    total_days: {
      type: Sequelize.NUMBER,
      required: true,
    },

    adminId: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Timetable;
