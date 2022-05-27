'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "UserId" });
      this.belongsTo(models.Post, { foreignKey: "TargetId" });
    }
  }
  History.init({
    action: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location cannot be empty"
        },
        notNull: {
          msg: "Location cannot be empty"
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location cannot be empty"
        },
        notNull: {
          msg: "Location cannot be empty"
        },
        min: {
          args: [1],
          msg: "Price cannot be less than 1"
        }
      }
    },
    TargetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location cannot be empty"
        },
        notNull: {
          msg: "Location cannot be empty"
        },
        min: {
          args: [1],
          msg: "Price cannot be less than 1"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};