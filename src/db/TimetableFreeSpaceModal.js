module.exports = (sequelize, DataTypes) => {
  const TimetableFreeSpace = sequelize.define(
    "timetable_free_spaces",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      timetableId: {
        type: DataTypes.INTEGER,
        required: true,
      },
      classroomId: {
        type: DataTypes.INTEGER,
        required: true,
      },
      free_space: {
        type: DataTypes.INTEGER,
      },
      isFree: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      date: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    { timestamps: false }
  );

  return TimetableFreeSpace;
};
