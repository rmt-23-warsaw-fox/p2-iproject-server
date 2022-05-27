'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "UserId" });
      this.belongsTo(models.Post, { foreignKey: "PostId" });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    archieved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};