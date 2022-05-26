"use strict";
const { Model } = require("sequelize");
const { hashed } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsToMany(models.Doctor, {
        through: models.DoctorPatient,
        as: "doctors",
        foreignKey: "PatientId",
      });

    }
  }
  Patient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone Number is required" },
          notNull: { msg: "Phone Number is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone Number is required" },
          notNull: { msg: "Phone Number is required" },
        },
      },
      symptomps: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Symptomps is required" },
          notNull: { msg: "Symptomps is required" },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashed(user.password)
        },
      },
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
