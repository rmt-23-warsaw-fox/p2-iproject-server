'use strict';
const {
  Model
} = require('sequelize');
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
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Username cannot be null.'
      },
      unique: {
        args: true,
        msg: 'Username already exist.'
      },
      validate: {
        notEmpty: {args: true, msg: 'Username is required.'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email cannot be null.'
      },
      unique: {
        args: true,
        msg: 'Email already exist.'
      },
      validate: {
        notEmpty: {args: true, msg: 'Email is required.'},
        isEmail: {args: true, msg: 'Email format is required.'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Password cannot be null.'
      },
      validate: {
        notEmpty: {args: true, msg: 'Password is required.'}
      }
    },
    gender: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};