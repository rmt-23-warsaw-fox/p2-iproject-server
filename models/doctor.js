"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.Patient, {
        through: models.DoctorPatient,
        as: "patients",
        foreignKey: "DoctorId",
      });
    }
  }
  Doctor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      email: { type: DataTypes.STRING, allowNull: false, validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format"}
      }},
      password: { type: DataTypes.STRING, allowNull: false,  validate: {
        notEmpty: { msg: "Password is required" },
        notNull: { msg: "Password is required" },
      },},
      phoneNumber: { type: DataTypes.STRING, allowNull: false,  validate: {
        notEmpty: { msg: "Phone Number is required" },
        notNull: { msg: "Phone Number is required" },
      },},
      speciality: { type: DataTypes.STRING, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
