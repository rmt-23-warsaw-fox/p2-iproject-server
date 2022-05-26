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
      Post.hasMany(models.Like)
    }
  }
  Post.init({
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'Image URL is required.'},
        notNull: {args: true, msg: 'Image URL cannot be null.'}
      }
    },
    description: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: 'UserId is required.'},
        notNull: {args: true, msg: 'UserId cannot be null.'}
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};