const { DataTypes } = require("sequelize");

const { mainDBConnection } = require("../config/database");
const { Status } = require("../constant");
const User = require("./user.model");

const Tenant = mainDBConnection.define(
  "Tenant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    dbName: {
      type: DataTypes.STRING,
      unique: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Status.Activated,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    updatedAt: true,
    createdAt: true,
  }
);

User.hasMany(Tenant);
Tenant.belongsTo(User);

module.exports = Tenant;
