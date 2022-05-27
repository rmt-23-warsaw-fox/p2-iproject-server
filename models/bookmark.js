'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookmark.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    price: DataTypes.STRING,
    percentace: DataTypes.STRING,
    image: DataTypes.STRING,
    mycoins: DataTypes.INTEGER,
    myamount: DataTypes.FLOAT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};