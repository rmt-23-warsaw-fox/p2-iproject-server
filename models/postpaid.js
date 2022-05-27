'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostPaid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "PayerId" });
      this.belongsTo(models.Post, { foreignKey: "PostId" });
    }
  }
  PostPaid.init({
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PayerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    coin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PostPaid',
  });
  return PostPaid;
};