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

module.exports = sequelize;
