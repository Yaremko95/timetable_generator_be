const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
//const UserModel = require("./UserSchema");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize(
  process.env.DATABSE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: true,
    // },
    pool: {
      //optional!
      min: 0,
      max: 10,
    },
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tablesSequelize
db.users = require("./UserModal")(sequelize, Sequelize);
db.timetables = require("./TimetableModal")(sequelize, Sequelize);

db.classes = require("./ClassModal")(sequelize, Sequelize);
db.timetableFreeSpaces = require("./TimetableFreeSpaceModal")(
  sequelize,
  Sequelize
);
db.classFilledSpaces = require("./ClassFilledSpaceModal")(sequelize, Sequelize);
db.groups = require("./GroupModal")(sequelize, Sequelize);
db.classrooms = require("./ClassroomModal")(sequelize, Sequelize);
db.classroomClasses = require("./ClassroomClassModal")(sequelize, Sequelize);
db.groupClasses = require("./GroupClassModal")(sequelize, Sequelize);
const User = db.users;
const Timetable = db.timetables;
const Class = db.classes;
const TimetableFreeSpace = db.timetableFreeSpaces;
const ClassFilledSpace = db.classFilledSpaces;
const Group = db.groups;
const Classroom = db.classrooms;
const ClassroomClass = db.classroomClasses;
const GroupClass = db.groupClasses;
//console.log(db);
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// Group.hasMany(User, { foreignKey: "groupId", as: "students" });
// User.belongsTo(Group, { foreignKey: "groupId" });
User.hasMany(Timetable, { foreignKey: "adminId", as: "createdTimetables" });
Timetable.belongsTo(User, { foreignKey: "adminId", as: "admin" });
User.hasMany(Class, { foreignKey: "teacherId", as: "classes" });
Class.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });
Timetable.hasMany(Class, {
  foreignKey: "timetableId",
  as: "classes",
  onDelete: "CASCADE",
});

Class.belongsTo(Timetable, { foreignKey: "timetableId", as: "timetable" });
Group.belongsToMany(Class, { through: GroupClass, as: "classes" });
Class.belongsToMany(Group, { through: GroupClass, as: "groups" });

Classroom.belongsToMany(Class, { through: ClassroomClass, as: "classes" });
Class.belongsToMany(Classroom, { through: ClassroomClass, as: "classrooms" });

TimetableFreeSpace.belongsTo(Timetable, {
  foreignKey: "timetableId",
  as: "timetable",
});
Timetable.hasMany(TimetableFreeSpace, {
  foreignKey: "timetableId",
  as: "free",
});

TimetableFreeSpace.belongsTo(Classroom, { foreignKey: "classroomId" });
Classroom.hasMany(TimetableFreeSpace, { foreignKey: "classroomId" });
TimetableFreeSpace.hasOne(ClassFilledSpace, {
  foreignKey: "freeSpaceId",
  as: "freeSpace",
});
ClassFilledSpace.belongsTo(TimetableFreeSpace, {
  foreignKey: "freeSpaceId",
  as: "freeSpace",
});
ClassFilledSpace.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(ClassFilledSpace, { foreignKey: "classId", as: "filled" });
Group.belongsTo(Timetable, { foreignKey: "timetableId" });
Timetable.hasMany(Group, { foreignKey: "timetableId", as: "groups" });
Classroom.belongsTo(Timetable, { foreignKey: "timetableId" });
Timetable.hasMany(Classroom, { foreignKey: "timetableId", as: "classrooms" });
// sequelize.sync({ force: true }).then(() => {
//   console.log(`Database & tables created!`);
// });
module.exports = db;
