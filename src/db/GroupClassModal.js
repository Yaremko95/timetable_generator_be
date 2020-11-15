module.exports = (sequelize, DataTypes) => {
  const GroupClass = sequelize.define(
    "GroupClasses",
    {},
    { timestamps: false }
  );
  return GroupClass;
};
