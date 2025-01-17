const { DataTypes } = require("sequelize");

exports.Status = {
  Disabled: 0,
  Activated: 1,
  Pending: 2,
  Deleted: 3,
};
