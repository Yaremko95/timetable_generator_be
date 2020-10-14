//const orm = require("../../../db");
//const Sequelize = require("sequelize");
//const Timetable = require("./TimeTableSchema");
//const UserGroup = require("./UserGroup");
//const User = require("../../users/UserSchema");
const db = require("../../db");
// const Group = db.groups;
// const Class = db.classes;
const Timetable = db.timetables;
//const Classroom = db.classrooms
module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define(
    "groups",
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
      empty_space: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [],
      },
      // classId: {
      //     type: Sequelize.NUMBER,
      //     allowNull: false,
      // }
    },
    { timestamps: false }
  );

  Group.belongsTo(Timetable, { foreignKey: "timetableId" });
  Timetable.hasMany(Group, { foreignKey: "timetableId", as: "groups" });
  return Group;
};
