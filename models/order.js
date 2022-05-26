'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Destination)
    }
  }
  Order.init({
    fullName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    DestinationId: DataTypes.INTEGER,
    date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    amountOfPeople: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};