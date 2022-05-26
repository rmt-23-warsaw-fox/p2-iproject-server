"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, { foreignKey: "CustomerId" });
      this.belongsTo(models.Event, { foreignKey: "EventId" });
    }
  }
  History.init(
    {
      CustomerId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
