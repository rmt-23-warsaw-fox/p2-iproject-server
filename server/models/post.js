'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: 'Image URL cannot be null.'},
      validate: {
        notEmpty: {args: true, msg: 'Image URL is required.'}
      }
    },
    description: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: {args: false, msg: 'UserId cannot be null.'},
      validate: {
        notEmpty: {args: true, msg: 'UserId is required.'}
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};