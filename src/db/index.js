const Sequelize = require("sequelize");

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
const models = {
  User: require("../services/users/UserSchema"),
  Timetable: require("../services/timetable/schemas/TimeTableSchema"),
  Class: require("../services/timetable/schemas/ClassSchema"),
  TimetableFreeSpace: require("../services/timetable/schemas/TimetableFreeSpace"),
  ClassFilledSpace: require("../services/timetable/schemas/ClassFilledSpace"),
  Group: require("../services/timetable/schemas/GroupSchema"),
  Classroom: require("../services/timetable/schemas/ClassRoomSchema"),
  ClassroomClass: require("../services/timetable/schemas/ClassromClass"),
  GroupClass: require("../services/timetable/schemas/GroupClass"),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
