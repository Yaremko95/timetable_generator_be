const { DataTypes } = require("sequelize");

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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // filled: {
      //   type: Sequelize.INTEGER,
      // },
    },
    { timestamps: false }
  );

  return Class;
};
