'use strict';
const {
  Model
} = require('sequelize');
const { hashingPass } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Bookmark)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Imvalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [5, 10],
          msg: 'Password must be 5 - 10 characters'
        }
      }
    },
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instanceUser, options) => {
    instanceUser.password = hashingPass(instanceUser.password)
  })
  return User;
};