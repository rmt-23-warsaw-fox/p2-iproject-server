'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypts');
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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg:'User name is already use!'
      },
      validate: {
        notNull: {
          msg: 'Cannot be null'
        },
        notEmpty: {
          msg: 'User Name is required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg:'Oops. Looks like you already have an account with this email address. Please try to login.'
      },
      validate: {
        isEmail: {
          msg: 'please use email format!'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'password cannot be null!'
        },
        notEmpty:{
        msg: 'password is required!'
        },
        len: {
          args: 5,
          msg: 'Please provide field min 5 characters.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option)=>{
    instance.password = hashPassword(instance.password)
  })
  return User;
};