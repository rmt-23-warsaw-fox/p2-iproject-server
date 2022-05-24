'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    
    static associate(models) {
      Wishlist.belongsTo(models.Accomodation)
      Wishlist.belongsTo(models.User)
    }
  }
  Wishlist.init({
    AccomodationId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};