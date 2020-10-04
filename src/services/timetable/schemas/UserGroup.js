// const orm = require("../../../db");
// const Sequelize = require("sequelize");
// const User = require("../../users/UserSchema");
// // const Timetable = require("./TimeTableSchema");
// const Group = require("./GroupSchema");
// // const Classroom = require("./ClassRoomSchema");
// // const Class = require("./ClassSchema");
//
// const UserGroup = orm.define(
//   "UserGroups",
//   {
//     // id: {
//     //   type: Sequelize.INTEGER,
//     //   primaryKey: true,
//     //   autoIncrement: true,
//     //   allowNull: false,
//     // },
//   },
//   { timestamps: false }
// );
// Group.belongsToMany(User, { through: UserGroup, as: "users" });
// User.belongsToMany(Group, { through: UserGroup, as: "groups" });
// module.exports = UserGroup;
