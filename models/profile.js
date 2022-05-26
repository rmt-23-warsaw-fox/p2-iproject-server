'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    fullName: DataTypes.STRING,
    bio: DataTypes.STRING,
    profilePicture: {
      type:DataTypes.STRING,
      defaultValue:"https://i.stack.imgur.com/l60Hf.png"
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks:{
      beforeCreate(instance, options) {
        if(instance.profilePicture === null || instance.profilePicture === ""){
          instance.profilePicture = "https://i.stack.imgur.com/l60Hf.png"
        } 
      }
    },
    modelName: 'Profile',
  });
  return Profile;
};