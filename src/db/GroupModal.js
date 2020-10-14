//const orm = require("../../../db");
//const Sequelize = require("sequelize");
//const Timetable = require("./TimeTableSchema");
//const UserGroup = require("./UserGroup");
//const User = require("../../users/UserSchema");
const db = require("./index");
const { DataTypes } = require("sequelize");
// const Group = db.groups;
// const Class = db.classes;
const Timetable = db.timetables;
//const Classroom = db.classrooms
module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define(
    "groups",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.NUMBER,
        required: true,
      },
      timetableId: {
        type: DataTypes.INTEGER,
        required: true,
      },
      empty_space: {
        type: Sequelize.ARRAY(Sequelize.NUMBER),
        defaultValue: [],
      },
      // classId: {
      //     type: Sequelize.NUMBER,
      //     allowNull: false,
      // }
    },
    { timestamps: false }
  );

  // Group.belongsTo(Timetable, { foreignKey: "timetableId" });
  // Timetable.hasMany(Group, { foreignKey: "timetableId", as: "groups" });
  return Group;
};
