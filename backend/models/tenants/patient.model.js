const { DataTypes } = require("sequelize");

const PatientModel = (sequelize) => {
  return sequelize.define(
    "patient",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
      updatedAt: true,
      createdAt: true,
    }
  );
};

module.exports = PatientModel;
