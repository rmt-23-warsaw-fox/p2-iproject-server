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
      this.belongsTo(models.User, { foreignKey: "AuthorId" });
      this.belongsTo(models.Type, { foreignKey: "typeId" });
    }
  }
  Post.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty"
          },
          notNull: {
            msg: "Name cannot be empty"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description cannot be empty"
          },
          notNull: {
            msg: "Description cannot be empty"
          }
        }
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image URL cannot be empty"
          },
          notNull: {
            msg: "Image URL cannot be empty"
          },
          isUrl: {
            msg: "Image URL format is not an url"
          }
        }
      },
      AuthorId: {
        type: DataTypes.INTEGER
      },
      location: {
        type: DataTypes.STRING,
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
      tag: {
        type: DataTypes.STRING       
      },
      statusArchieve: {
        type: DataTypes.STRING
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "typeId cannot be empty"
          },
          notNull: {
            msg: "typeId cannot be empty"
          }
        }
      },
    }, {
      sequelize,
      modelName: 'Post',
    });
    Post.addHook('beforeCreate', (post, options) => {
      if(!post.statusArchieve){
        post.statusArchieve="active"
      }
    });
  return Post;
};