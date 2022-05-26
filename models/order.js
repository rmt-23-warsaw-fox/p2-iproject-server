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
      Order.belongsTo(models.Product);
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unpaid",
      },
      midtransResponse: {
        type: DataTypes.TEXT,
      },
      orderCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.beforeCreate((instance, options) => {
    instance.orderCode = (Math.random() + 1).toString(36).substring(7);
  });
  return Order;
};
