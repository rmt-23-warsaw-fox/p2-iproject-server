'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      Bookmark.belongsTo(models.Destination, {
        foreignKey: 'DestinationId'
      })
    }
  }
  Bookmark.init({
    UserId: DataTypes.INTEGER,
    DestinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};