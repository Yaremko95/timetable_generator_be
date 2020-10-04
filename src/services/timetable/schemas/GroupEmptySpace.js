// const orm = require("../../../db");
// const Sequelize = require("sequelize");
// const Group = require("./GroupClass");
// const Timetable = require("./TimeTableSchema");
// const GroupEmptySpace = orm.define(
//   "group_empty_spaces",
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
//     groupId: {
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
// GroupEmptySpace.belongsTo(Group, { foreignKey: "groupId" });
// GroupEmptySpace.belongsTo(Timetable, { foreignKey: "timetableId" });
// Timetable.hasMany(GroupEmptySpace, {
//   foreignKey: "timetableId",
//   as: "group_empty_space",
// });
// module.exports = GroupEmptySpace;
