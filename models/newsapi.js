'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsAPI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, { foreignKey: 'LinkId' })
      this.hasMany(models.FavoriteNews, { foreignKey: 'LinkId' })
    }
  }
  NewsAPI.init({
    link: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'NewsAPI',
  });
  return NewsAPI;
};