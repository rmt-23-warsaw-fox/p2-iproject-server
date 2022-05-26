"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionHistory.init(
    {
      userId: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      productName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      priceTotal: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      detailProduct: DataTypes.STRING,
      orderId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
