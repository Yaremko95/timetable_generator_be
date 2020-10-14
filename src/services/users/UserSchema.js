const orm = require("../../db");
const Sequelize = require("sequelize");
const Moment = require("moment");
const bcrypt = require("bcrypt");
const Group = require("../timetable/schemas/GroupSchema");
//const UserGroup = require("../timetable/schemas/UserGroup");
const Timetable = require("../timetable/schemas/TimeTableSchema");
const User = orm.define(
  "users",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      validate: (value) => {
        if (!["admin", "teacher", "student"].includes(value)) {
          throw new Error("Provide role");
        }
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      // unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      // validate: function (value) {
      //   if (value === null && this.googleid === null) {
      //     throw new Error("Please provide password");
      //   }
      // },
      // get() {
      //   return "";
      // },
    },
    refresh_tokens: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: [],
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
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
      type: Sequelize.STRING,
      allowNull: true,
    },
    // timetableID:{
    //     type: Sequelize.NUMBER,
    //     allowNull: true,
    // },
    groupId: {
      type: Sequelize.NUMBER,
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
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
Group.hasMany(User, { foreignKey: "groupId", as: "students" });
User.belongsTo(Group, { foreignKey: "groupId" });
User.hasMany(Timetable, { foreignKey: "adminId", as: "createdTimetables" });
Timetable.belongsTo(User, { foreignKey: "adminId", as: "admin" });
User.sync({ force: true });
module.exports = User;
