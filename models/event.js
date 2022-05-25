"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Customer, {
        through: "Histories",
        foreignKey: "CustomerId",
      });
    }
  }
  Event.init(
    {
      nameOfEvent: DataTypes.STRING,
      description: DataTypes.TEXT,
      dateOfEvent: DataTypes.DATE,
      imageUrl: DataTypes.STRING,
      requiredHands: DataTypes.INTEGER,
      receivedHands: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
