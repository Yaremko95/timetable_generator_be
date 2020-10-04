const orm = require("../../../db");
const Sequelize = require("sequelize");
const User = require("../../users/UserSchema");
const Timetable = require("./TimeTableSchema");
const TeacherEmptySpace = orm.define(
  "teacher_empty_spaces",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    timetableId: {
      type: Sequelize.INTEGER,
      required: true,
    },
    teacherId: {
      type: Sequelize.INTEGER,
      required: true,
    },
    empty_space: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    },
  },
  { timestamps: false }
);
TeacherEmptySpace.belongsTo(User, { foreignKey: "teacherId" });

TeacherEmptySpace.belongsTo(Timetable, { foreignKey: "timetableId" });
Timetable.hasMany(TeacherEmptySpace, {
  foreignKey: "timetableId",
  as: "teacher_empty_space",
});
module.exports = TeacherEmptySpace;
