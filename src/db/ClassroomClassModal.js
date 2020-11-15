module.exports = (sequelize, DataTypes) => {
  const ClassroomClass = sequelize.define(
    "ClassroomClasses",
    {},
    { timestamps: false }
  );
  return ClassroomClass;
};
