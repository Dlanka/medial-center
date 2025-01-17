const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const { mainDBConnection } = require("../config/database");
const { Status } = require("../constant");

const User = mainDBConnection.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
      },
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Status.Activated,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    updatedAt: true,
    createdAt: true,
  }
);

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
