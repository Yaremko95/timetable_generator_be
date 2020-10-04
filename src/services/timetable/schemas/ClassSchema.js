const orm = require("../../../db");
const Sequelize = require("sequelize");
const User = require("../../users/UserSchema");
const Timetable = require("../schemas/TimeTableSchema");
const Group = require("../schemas/GroupSchema");
const Classroom = require("../schemas/ClassRoomSchema");
const GroupClass = require("../schemas/GroupClass");
const ClassroomClass = require("../schemas/ClassromClass");

const Class = orm.define(
  "classes",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },

    timetableId: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    teacherId: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duration: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    // filled: {
    //   type: Sequelize.INTEGER,
    // },
  },
  { timestamps: false }
);

User.hasMany(Class, { foreignKey: "teacherId", as: "classes" });
Class.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });
Timetable.hasMany(Class, {
  foreignKey: "timetableId",
  as: "classes",
  onDelete: "CASCADE",
});
//Timetable.hasMany(Class, { foreignKey: "timetableId", as: "teachers" });
//Timetable.hasMany(Class, { foreignKey: "timetableId", as: "groupList" });
Class.belongsTo(Timetable, { foreignKey: "timetableId", as: "timetable" });
Group.belongsToMany(Class, { through: GroupClass, as: "classes" });
Class.belongsToMany(Group, { through: GroupClass, as: "groups" });
// GroupClass.belongsTo(Class);
// GroupClass.belongsTo(Group);
// Group.hasMany(GroupClass);
// Class.hasMany(GroupClass);
Classroom.belongsToMany(Class, { through: ClassroomClass, as: "classes" });
Class.belongsToMany(Classroom, { through: ClassroomClass, as: "classrooms" });
// ClassroomClass.belongsTo(Class);
// ClassroomClass.belongsTo(Classroom);
// Classroom.hasMany(ClassroomClass);
// Class.hasMany(ClassroomClass);

// Timetable.hasMany(TimetableGroupClasses);
// GroupClass.hasMany(TimetableGroupClasses);
module.exports = Class;
