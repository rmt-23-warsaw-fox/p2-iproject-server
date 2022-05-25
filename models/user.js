"use strict"
const { Model } = require("sequelize")
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username is Required" },
          notEmpty: { msg: "Username is Required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email Must be Unique",
        },
        validate: {
          notNull: { msg: "Email is Required" },
          notEmpty: { msg: "Email is Required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 5,
            msg: "Minimum password length is 5 characters",
          },
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      dotaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          args: true,
          msg: "This dota id has been registered to our database",
        },
        validate: {
          notNull: { msg: "Dota id is Required" },
          notEmpty: { msg: "Dota id is Required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}
