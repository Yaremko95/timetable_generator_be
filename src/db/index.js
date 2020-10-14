const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABSE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
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
db.users = require("../services/users/UserSchema")(sequelize, Sequelize);
db.timetables = require("../services/timetable/schemas/TimeTableSchema")(
  sequelize,
  Sequelize
);
db.classes = require("../services/timetable/schemas/ClassSchema")(
  sequelize,
  Sequelize
);
db.timetableFreeSpaces = require("../services/timetable/schemas/TimetableFreeSpace")(
  sequelize,
  DataTypes
);
db.classFilledSpaces = require("../services/timetable/schemas/ClassFilledSpace")(
  sequelize,
  Sequelize
);
db.groups = require("../services/timetable/schemas/GroupSchema")(
  sequelize,
  Sequelize
);
db.classrooms = require("../services/timetable/schemas/ClassRoomSchema")(
  sequelize,
  Sequelize
);
db.classroomClasses = require("../services/timetable/schemas/ClassromClass")(
  sequelize,
  Sequelize
);
db.groupClasses = require("../services/timetable/schemas/GroupClass")(
  sequelize,
  Sequelize
);
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
