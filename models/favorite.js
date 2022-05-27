'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
    }
  }
  Favorite.init(
    {
      MovieId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favorite',
    }
  );
  return Favorite;
};
