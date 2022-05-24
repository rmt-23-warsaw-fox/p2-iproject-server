'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    
    static associate(models) {
      Admin.hasMany(models.Type);
    }
  }
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required",
        },
        notEmpty: {
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
        notNull: {
          args: true,
          msg: "Password is required",
        },
        notEmpty: {
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
        notNull: {
          args: true,
          msg: "Firstname is required",
        },
        notEmpty: {
          args: true,
          msg: "Firstname is required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Lastname is required",
        },
        notEmpty: {
          args: true,
          msg: "Lastname is required",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Phone number is required",
        },
        notEmpty: {
          args: true,
          msg: "Phone number is required",
        },
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Address is required",
        },
        notEmpty: {
          args: true,
          msg: "Address is required",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};