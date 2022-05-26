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
      User.hasMany(models.Post)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:  false,
      unique: {
        args: true,
        msg: 'Username already exist.'
      },
      validate: {
        notEmpty: {args: true, msg: 'Username is required.'},
        notNull: {args: true, msg: 'Username cannot be null.'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exist.'
      },
      validate: {
        notEmpty: {args: true, msg: 'Email is required.'},
        isEmail: {args: true, msg: 'Email format is required.'},
        notNull: {args: true, msg: 'Email cannot be null.'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'Password is required.'},
        notNull: {args: true, msg: 'Password cannot be null.'}
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