'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profile_Pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          keys: "id"
        },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      imageType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageData: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profile_Pictures');
  }
};