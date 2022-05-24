'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Buy)
      this.hasMany(models.Major)
    }
  }
  Package.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'name is required'
        },
        notEmpty: {
          msg: 'name is required'
        }
      }
    },
    totalVideo: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'total video is required'
        },
        notEmpty: {
          msg: 'total video is required'
        }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'price is required'
        },
        notEmpty: {
          msg: 'price is required'
        }
      }
    },
    imgUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'imageUrl is required'
        },
        notEmpty: {
          msg: 'imageUrl is required'
        }
      }
    },
    MajorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'major is required'
        },
        notEmpty: {
          msg: 'major is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Package',
  });
  return Package;
};