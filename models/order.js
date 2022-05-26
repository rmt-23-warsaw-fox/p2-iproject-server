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
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `fullName is required`
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `email is required`
        }
      }
    },
    phone: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `phone is required`
        }
      }
    },
    DestinationId: DataTypes.INTEGER,
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `date is required`
        }
      }
    },
    amountOfPeople: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: {
          msg: `amountOfPeople is required`
        }
      }
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