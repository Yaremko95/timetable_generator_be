const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
//const UserModel = require("./UserSchema");

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

module.exports = db;
