"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username cannot be null",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email cannot be null",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password cannot be null",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address is required",
          },
          notNull: {
            msg: "Address cannot be null",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone number is required",
          },
          notNull: {
            msg: "Phone number cannot be null",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
