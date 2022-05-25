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
      this.hasMany(models.Comment)
      this.hasMany(models.FavoriteNews)
      this.hasMany(models.UnFavoriteNews)
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "Email already exists"
      },
      validate :{
        notNull :{
          msg : "Email is required"
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email is Invalid'
        }
      }
    },
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull :{
          msg : "Email is required"
        },
        notEmpty: {
          msg: 'Email is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};