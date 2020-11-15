const db = require("./index");
//const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ClassFilledSpace = sequelize.define(
    "class_filled_spaces",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      classId: {
        type: DataTypes.INTEGER,
        required: true,
      },
      freeSpaceId: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  return ClassFilledSpace;
};
