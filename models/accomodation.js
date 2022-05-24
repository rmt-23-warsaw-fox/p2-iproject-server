'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    
    static associate(models) {
      Accomodation.belongsTo(models.Type);
      Accomodation.belongsTo(models.Admin)
      Accomodation.belongsToMany(models.User, { through: "Wishlists" })
    }
  }
  Accomodation.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required"
        },
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    facility: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: "Facility is required"
        },
        notEmpty: {
          args: true,
          msg: "Facility is required"
        }
      }
    },
    roomCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Room Capacity is required"
        },
        notEmpty: {
          args: true,
          msg: "Room Capacity is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image Url is required"
        },
        notEmpty: {
          args: true,
          msg: "Image Url is required"
        }
      }
    },
    AdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Location is required"
        },
        notEmpty: {
          args: true,
          msg: "Location is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is required"
        },
        notEmpty: {
          args: true,
          msg: "Price is required"
        }
      }
    },
    TypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Accomodation',
  });
  return Accomodation;
};