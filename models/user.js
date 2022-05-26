'use strict';
const { Model } = require('sequelize');
const { passwordEncryptor } = require('../helpers/helperBcrypt');
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
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Email already exists' },
        validate: {
          isEmail: { args: true, msg: 'Please enter a valid email address' },
          notNull: { args: true, msg: 'Please enter an email address' },
          notEmpty: { args: true, msg: 'Please enter an email address' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Please enter a password' },
          notEmpty: { args: true, msg: 'Please enter a password' },
        },
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((instance, option) => {
    instance.password = passwordEncryptor(instance.password);
  });
  return User;
};
