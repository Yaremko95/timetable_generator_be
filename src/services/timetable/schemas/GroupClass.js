const orm = require("../../../db");
const Sequelize = require("sequelize");
const User = require("../../users/UserSchema");
const Timetable = require("./TimeTableSchema");
const Group = require("./GroupSchema");
const Classroom = require("./ClassRoomSchema");
const Class = require("./ClassSchema");

const GroupClass = orm.define(
  "GroupClasses",
  {
    // id: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
  },
  { timestamps: false }
);

module.exports = GroupClass;
