const db = require("./index");
const { DataTypes } = require("sequelize");
const Class = db.classes;
const TimetableFreeSpace = db.timetableFreeSpaces;
//const Classroom = db.classrooms

//const Sequelize = require("sequelize");
// const Class = require("./ClassSchema");
// const TimetableFreeSpace = require("./TimetableFreeSpace");
// const Classroom = require("./ClassRoomSchema");
// const Timetable = require("./TimeTableSchema");
module.exports = (sequelize, Sequelize) => {
  const ClassFilledSpace = sequelize.define(
    "class_filled_spaces",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      classId: {
        type: Sequelize.NUMBER,
        required: true,
      },
      freeSpaceId: {
        type: Sequelize.NUMBER,
      },
    },
    { timestamps: false }
  );
  // TimetableFreeSpace.hasOne(ClassFilledSpace, {
  //     foreignKey: "freeSpaceId",
  //     as: "freeSpace",
  // });
  // ClassFilledSpace.belongsTo(TimetableFreeSpace, {
  //     foreignKey: "freeSpaceId",
  //     as: "freeSpace",
  // });
  // ClassFilledSpace.belongsTo(Class, { foreignKey: "classId" });
  // Class.hasMany(ClassFilledSpace, { foreignKey: "classId", as: "filled" });
  return ClassFilledSpace;
};
