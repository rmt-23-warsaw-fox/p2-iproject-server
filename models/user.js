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
      this.belongsToMany(models.Package, {
        through: models.Buy,
        foreignKey: 'PackageId'
      })
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Nama diperlukan'
        },
        notEmpty: {
          msg: 'Nama diperlukan'
        }
      }
    },
    email: {
      unique: {
        msg: 'email harus unik'
      }, 
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'email diperlukan'
        },
        notEmpty: {
          msg: 'email diperlukan'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'password diperlukan'
        },
        notEmpty: {
          msg: 'password diperlukan'
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