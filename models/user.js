'use strict';
const { hashPassword } = require('../helpers/encryption')
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
      User.hasOne(models.Profile_Picture, {foreignKey:"UserId"});
    }
  }
  User.init({
    displayName: {
      type: DataTypes.STRING,
      unique: {
        msg: "Name already taken",
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Display name required",
        },
        notEmpty: {
          msg: "Display name required",
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      unique: {
        msg: "Email already registered",
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
        notEmpty: {
          msg: "Email required",
        },
        notNull:{
          msg:"Email is required",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password required",
        },
        notNull:{
          msg:"password required",
        },
        len: {
          args: 8,
          msg: "Password must be at least 8 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return User;
};