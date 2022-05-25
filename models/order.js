"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, { foreignKey: "CustomerId" });
    }
  }
  Order.init(
    {
      CustomerId: DataTypes.INTEGER,
      orderedHands: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "unfinished",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
