'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      this.belongsTo(models.Package, {
        foreignKey: 'PackageId'
      })

    }
  }
  Buy.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'user is required'
        },
        notEmpty: {
          msg: 'user is required'
        }
      }
    },
    PackageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'package is required'
        },
        notEmpty: {
          msg: 'package is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Buy',
  });
  return Buy;
};