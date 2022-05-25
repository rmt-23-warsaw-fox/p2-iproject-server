'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participant.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Name has been taken"
      },
      validate:{
        notNull:{
          msg:"Please input your name"
        },
        notEmpty:{
          msg:"Please input your name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Email has been registered"
      },
      validate:{
        notNull:{
          msg:"Email is required"
        },
        notEmpty:{
          msg:"Email is required"
        },
        isEmail:{
          msg:"Please input a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Password is required"
        },
        notEmpty:{
          msg:"Password is required"
        }
      }
    },
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Participant',
    hooks:{
      beforeCreate(user){
        user.password = hashing(user.password)
      }
    }
  });
  return Participant;
};