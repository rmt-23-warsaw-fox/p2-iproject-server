'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Buy, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'name is required'
        },
        notEmpty: {
          msg: 'name is required'
        }
      }
    },
    email: {
      unique: {
        msg: 'email must be unique'
      }, 
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'email is required'
        },
        notEmpty: {
          msg: 'email is required'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'password is required'
        },
        notEmpty: {
          msg: 'password is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {beforeCreate: (ins, opt) => {
      ins.password = hashPassword(ins.password)
    }}
  });
  return User;
};