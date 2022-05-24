"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile_Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile_Picture.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Profile_Picture.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      imageType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      imageData: {
        allowNull: false,
        type: DataTypes.BLOB,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
    },
    {
      sequelize,
      modelName: "Profile_Picture",
    }
  );
  return Profile_Picture;
};
