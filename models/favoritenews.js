'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FavoriteNews.init({
    UserId: DataTypes.INTEGER,
    LinkId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FavoriteNews',
  });
  return FavoriteNews;
};