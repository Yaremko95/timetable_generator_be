const orm = require("../../../db");
const Sequelize = require("sequelize");
const Class = require("./ClassSchema");
const TimetableFreeSpace = require("./TimetableFreeSpace");
const Classroom = require("./ClassRoomSchema");
const Timetable = require("./TimeTableSchema");
const ClassFilledSpace = orm.define(
  "class_filled_spaces",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    classId: {
      type: Sequelize.INTEGER,
      required: true,
    },
    freeSpaceId: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false }
);
TimetableFreeSpace.hasOne(ClassFilledSpace, {
  foreignKey: "freeSpaceId",
  as: "freeSpace",
});
ClassFilledSpace.belongsTo(TimetableFreeSpace, {
  foreignKey: "freeSpaceId",
  as: "freeSpace",
});
ClassFilledSpace.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(ClassFilledSpace, { foreignKey: "classId", as: "filled" });
module.exports = ClassFilledSpace;
