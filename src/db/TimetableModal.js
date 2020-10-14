//const orm = require("../../../db");
//const Sequelize = require("sequelize");
//const User = require("../../users/UserSchema");
//const Class = require("./ClassSchema");
//const TeacherEmptySpace = require("./TeacherEmptySpace");
//const Group = require("./GroupSchema");
const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Timetable = sequelize.define(
    "timetables",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        required: true,
      },
      total_hours: {
        type: DataTypes.INTEGER,
        required: true,
      },
      total_days: {
        type: DataTypes.INTEGER,
        required: true,
      },

      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Timetable;
};
