const { Sequelize, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
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
db.users = require("./UserModal")(sequelize, DataTypes);
db.timetables = require("./TimetableModal")(sequelize, DataTypes);

db.classes = require("./ClassModal")(sequelize, DataTypes);
db.timetableFreeSpaces = require("./TimetableFreeSpaceModal")(
  sequelize,
  DataTypes
);
db.classFilledSpaces = require("./ClassFilledSpaceModal")(sequelize, DataTypes);
db.groups = require("./GroupModal")(sequelize, DataTypes);
db.classrooms = require("./ClassroomModal")(sequelize, DataTypes);
db.classroomClasses = require("./ClassroomClassModal")(sequelize, DataTypes);
db.groupClasses = require("./GroupClassModal")(sequelize, DataTypes);
const User = db.users;
const Timetable = db.timetables;
const Class = db.classes;
const TimetableFreeSpace = db.timetableFreeSpaces;
const ClassFilledSpace = db.classFilledSpaces;
const Group = db.groups;
const Classroom = db.classrooms;
const ClassroomClass = db.classroomClasses;
const GroupClass = db.groupClasses;

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

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

module.exports = db;
