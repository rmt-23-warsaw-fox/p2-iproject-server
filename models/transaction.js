'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    
    static associate(models) {
      Transaction.belongsTo(models.Accomodation);
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Type);
    }
  }
  Transaction.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Accomodation is required'
        },
        notEmpty: {
          args: true,
          msg: 'Accomodation is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        }
      }
    },
    totalNight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Total Night is required'
        },
        notEmpty: {
          args: true,
          msg: 'Total Night is required'
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Total Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Total Price is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
    },
    UserId: DataTypes.INTEGER,
    AccomodationId: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    orderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      beforeCreate(instance) {
        instance.status = 'pending'
      }
    }
  });
  return Transaction;
};