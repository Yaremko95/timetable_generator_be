const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
//const UserModel = require("./UserSchema");

const sequelize = new Sequelize(
  process.env.DATABSE,
  process.env.USERNAME,
  process.env.PGPASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
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

//Models/tables
db.users = require("./UserModal")(sequelize, Sequelize);
db.timetables = require("./TimetableModal")(sequelize, Sequelize);

db.classes = require("./ClassModal")(sequelize, Sequelize);
db.timetableFreeSpaces = require("./TimetableFreeSpaceModal")(
  sequelize,
  DataTypes
);
db.classFilledSpaces = require("./ClassFilledSpaceModal")(sequelize, Sequelize);
db.groups = require("./GroupModal")(sequelize, Sequelize);
db.classrooms = require("./ClassModal")(sequelize, Sequelize);
db.classroomClasses = require("./ClassroomClassModal")(sequelize, Sequelize);
db.groupClasses = require("./GroupClassModal")(sequelize, Sequelize);
console.log(db);
// const models = {
//   User: require("../services/users/UserSchema")(sequelize, Sequelize),
//   Timetable: require("../services/timetable/schemas/TimeTableSchema")(
//     sequelize,
//     Sequelize
//   ),
//   Class: require("../services/timetable/schemas/ClassSchema")(
//     sequelize,
//     Sequelize
//   ),
//   TimetableFreeSpace: require("../services/timetable/schemas/TimetableFreeSpace")(
//     sequelize,
//     Sequelize
//   ),
//   ClassFilledSpace: require("../services/timetable/schemas/ClassFilledSpace")(
//     sequelize,
//     Sequelize
//   ),
//   Group: require("../services/timetable/schemas/GroupSchema")(
//     sequelize,
//     Sequelize
//   ),
//   Classroom: require("../services/timetable/schemas/ClassRoomSchema")(
//     sequelize,
//     Sequelize
//   ),
//   ClassroomClass: require("../services/timetable/schemas/ClassromClass")(
//     sequelize,
//     Sequelize
//   ),
//   GroupClass: require("../services/timetable/schemas/GroupClass")(
//     sequelize,
//     Sequelize
//   ),
// };
//
// Object.keys(models).forEach((modelName) => {
//   if ("associate" in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });
//
// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

module.exports = db;
