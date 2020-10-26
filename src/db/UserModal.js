const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        validate: (value) => {
          if (!["admin", "teacher", "student"].includes(value)) {
            throw new Error("Provide role");
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refresh_tokens: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      // resetPasswordToken: {
      //     type: String,
      //     required: false
      // },
      //
      // resetPasswordExpires: {
      //     type: Date,
      //     required: false
      // }
      googleid: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async function (user) {
          if (user.password) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async function (user) {
          if (user.password) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
