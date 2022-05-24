"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSeat.belongsTo(models.Movie);
      UserSeat.belongsTo(models.User);
    }
  }
  UserSeat.init(
    {
      seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Heros",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      MovieId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Movies",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "UserSeat",
    }
  );
  return UserSeat;
};
