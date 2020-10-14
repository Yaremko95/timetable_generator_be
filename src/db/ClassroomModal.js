// const orm = require("../../../db");
// const Sequelize = require("sequelize");
//const Timetable = require("./TimeTableSchema");
const { DataTypes } = require("sequelize");
const db = require("./index");
const Timetable = db.timetables;
module.exports = (sequelize, Sequelize) => {
  const ClassRoom = sequelize.define(
    "classrooms",
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
      timetableId: {
        type: DataTypes.INTEGER,
        required: true,
      },
    },
    {
      timestamps: false,
    }
  );
  // ClassRoom.belongsTo(Timetable, { foreignKey: "timetableId" });
  // Timetable.hasMany(ClassRoom, { foreignKey: "timetableId", as: "classrooms" });
  return ClassRoom;
};
