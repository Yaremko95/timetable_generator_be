const orm = require("../../../db");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
//const Sequelize = require("sequelize");
const Class = require("./ClassSchema");
const Timetable = require("./TimeTableSchema");
const Classroom = require("./ClassRoomSchema");
const TimetableFreeSpace = orm.define(
  "timetable_free_spaces",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    timetableId: {
      type: DataTypes.NUMBER,
      required: true,
    },
    classroomId: {
      type: DataTypes.NUMBER,
      required: true,
    },
    free_space: {
      type: DataTypes.NUMBER,
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    date: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  { timestamps: false }
);
TimetableFreeSpace.belongsTo(Timetable, {
  foreignKey: "timetableId",
  as: "timetable",
});
Timetable.hasMany(TimetableFreeSpace, {
  foreignKey: "timetableId",
  as: "free",
});

TimetableFreeSpace.belongsTo(Classroom, { foreignKey: "classroomId" });
Classroom.hasMany(TimetableFreeSpace, { foreignKey: "classroomId" });

module.exports = TimetableFreeSpace;
