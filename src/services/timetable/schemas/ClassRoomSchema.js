const orm = require("../../../db");
const Sequelize = require("sequelize");
const Timetable = require("./TimeTableSchema");
const ClassRoom = orm.define(
  "classrooms",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.NUMBER,
      required: true,
    },
    timetableId: {
      type: Sequelize.INTEGER,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
ClassRoom.belongsTo(Timetable, { foreignKey: "timetableId" });
Timetable.hasMany(ClassRoom, { foreignKey: "timetableId", as: "classrooms" });
module.exports = ClassRoom;
