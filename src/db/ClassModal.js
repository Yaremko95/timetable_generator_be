const orm = require("./index");
const { DataTypes } = require("sequelize");

const db = require("./index");
const User = db.users;
const Group = db.groups;
//const User = require("../../users/UserSchema");
//const Timetable = require("../schemas/TimeTableSchema");
//const Group = require("../schemas/GroupSchema");
//const Classroom = require("../schemas/ClassRoomSchema");
const GroupClass = db.groupClasses;
const ClassroomClass = db.classroomClasses;

// const Group = db.groups;
// const Class = db.classes;
const Timetable = db.timetables;
const Classroom = db.classrooms;
module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define(
    "classes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      timetableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.INTEGER,
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

  // User.hasMany(Class, { foreignKey: "teacherId", as: "classes" });
  // Class.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });
  // Timetable.hasMany(Class, {
  //   foreignKey: "timetableId",
  //   as: "classes",
  //   onDelete: "CASCADE",
  // });
  // //Timetable.hasMany(Class, { foreignKey: "timetableId", as: "teachers" });
  // //Timetable.hasMany(Class, { foreignKey: "timetableId", as: "groupList" });
  // Class.belongsTo(Timetable, { foreignKey: "timetableId", as: "timetable" });
  // Group.belongsToMany(Class, { through: GroupClass, as: "classes" });
  // Class.belongsToMany(Group, { through: GroupClass, as: "groups" });
  // // GroupClass.belongsTo(Class);
  // // GroupClass.belongsTo(Group);
  // // Group.hasMany(GroupClass);
  // // Class.hasMany(GroupClass);
  // Classroom.belongsToMany(Class, { through: ClassroomClass, as: "classes" });
  // Class.belongsToMany(Classroom, { through: ClassroomClass, as: "classrooms" });
  // // ClassroomClass.belongsTo(Class);
  // // ClassroomClass.belongsTo(Classroom);
  // // Classroom.hasMany(ClassroomClass);
  // // Class.hasMany(ClassroomClass);
  //
  // // Timetable.hasMany(TimetableGroupClasses);
  // // GroupClass.hasMany(TimetableGroupClasses);
  return Class;
};
