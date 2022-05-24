"use strict";
const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserSeat);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true, isEmail: true },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = encryptPassword(instance.password);
        },
      },
    }
  );
  return User;
};
