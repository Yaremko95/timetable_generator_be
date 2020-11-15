module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "groups",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        required: true,
      },
      timetableId: {
        type: DataTypes.INTEGER,
        required: true,
      },
      empty_space: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    { timestamps: false }
  );

  return Group;
};
