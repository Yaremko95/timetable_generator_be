//const orm = require("../../../db");
//const Sequelize = require("sequelize");
//const User = require("../../users/UserSchema");
//const Class = require("./ClassSchema");
//const TeacherEmptySpace = require("./TeacherEmptySpace");

module.exports = (sequelize, DataTypes) => {
  const Timetable = sequelize.define(
    "timetables",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
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
