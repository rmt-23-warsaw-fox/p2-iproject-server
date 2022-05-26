'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
   
    static associate(models) {
     Region.hasMany(models.Destination)
    }
  }
  Region.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};