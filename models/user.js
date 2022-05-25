'use strict';
const {
  Model
} = require('sequelize');
const { hashpw } = require('../helpers');
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
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        args : true,
        msg : "Username already taken"
      },
      validate : {
        notNull : {
          args : true,
          msg : "Username is required"
        },
        notEmpty : {
          args : true,
          msg : 'Username is required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        args : true,
        msg : "Email already taken"
      },
      validate : {
        notNull : {
          args : true,
          msg : "Email is required"
        },
        notEmpty : {
          args : true,
          msg : 'Email is required'
        },
        isEmail : {
          args : true,
          msg : "Invalid email format"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Password is required"
        },
        notEmpty : {
          args : true,
          msg : 'Password is required'
        }
      }
    },
    puuid: {
      type:DataTypes.STRING,
    },
    tagline : DataTypes.STRING,
    ign : DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate : (instance) => {
        instance.password = hashpw(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};