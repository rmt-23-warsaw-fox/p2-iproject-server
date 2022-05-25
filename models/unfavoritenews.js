'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnFavoriteNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.NewsAPI)
    }
  }
  UnFavoriteNews.init({
    UserId: DataTypes.INTEGER,
    LinkId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UnFavoriteNews',
  });
  return UnFavoriteNews;
};