module.exports = (sequelize, DataTypes) => {
  const ClassRoom = sequelize.define(
    "classrooms",
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
    },
    {
      timestamps: false,
    }
  );

  return ClassRoom;
};
