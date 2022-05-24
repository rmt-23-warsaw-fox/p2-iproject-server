"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Accomodation, { through: "Wishlists" })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: {
            args: true,
            msg: "Email is required",
          },
          isEmpty: {
            args: true,
            msg: "Email is required",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: {
            args: true,
            msg: "Password is required",
          },
          isEmpty: {
            args: true,
            msg: "Password is required",
          },
          isLengthMoreThanEight(value) {
            if (value.length > 0 && value.length < 6) {
              throw new Error("Password minimum 6 characters");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: {
            args: true,
            msg: "Firstname is required",
          },
          isEmpty: {
            args: true,
            msg: "Firstname is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: {
            args: true,
            msg: "Lastname is required",
          },
          isEmpty: {
            args: true,
            msg: "Lastname is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: {
            args: true,
            msg: "Phone number is required",
          },
          isEmpty: {
            args: true,
            msg: "Phone number is required",
          },
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: {
            args: true,
            msg: "Address is required",
          },
          isEmpty: {
            args: true,
            msg: "Address is required",
          },
        }
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
