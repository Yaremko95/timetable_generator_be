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
// const db = {};
//
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
//
// //Models/tables
// db.users = require("../model/customer.model.js")(sequelize, Sequelize);

// module.exports = db;

module.exports = sequelize;
