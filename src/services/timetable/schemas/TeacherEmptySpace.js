// const orm = require("../../../db");
// const Sequelize = require("sequelize");
// const User = require("../../../db/UserSchema");
// const Timetable = require("../../../db/TimeTableSchema");
// const TeacherEmptySpace = orm.define(
//   "teacher_empty_spaces",
//   {
//     id: {
//       type: Sequelize.NUMBER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     timetableId: {
//       type: Sequelize.INTEGER,
//       required: true,
//     },
//     teacherId: {
//       type: Sequelize.INTEGER,
//       required: true,
//     },
//     empty_space: {
//       type: Sequelize.ARRAY(Sequelize.INTEGER),
//       defaultValue: [],
//     },
//   },
//   { timestamps: false }
// );
// TeacherEmptySpace.belongsTo(User, { foreignKey: "teacherId" });
//
// TeacherEmptySpace.belongsTo(Timetable, { foreignKey: "timetableId" });
// Timetable.hasMany(TeacherEmptySpace, {
//   foreignKey: "timetableId",
//   as: "teachers",
// });
// module.exports = TeacherEmptySpace;
