"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Food", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ApiId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ApiName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ApiThumb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Food");
  },
};
