'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Review)
      this.hasMany(models.Favorite)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        notNull: {
          msg: 'Please input email'
        },
        notEmpty: {
          msg: 'Please input email'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input password'
        },
        notEmpty: {
          msg: 'Please input password'
        },
        len: {
          args: [5,15],
          msg: 'Password must be between 5 to 15 characters'
        }
      }
    },
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(userInstance => {
    userInstance.password = hashPassword(userInstance.password)
  }) 

  return User;
};