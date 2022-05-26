'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
  
    static associate(models) {
      Destination.hasMany(models.Bookmark)
      Destination.belongsTo(models.Region, {
        foreignKey: 'RegionId'
      })
    }
  }
  Destination.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    RegionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};