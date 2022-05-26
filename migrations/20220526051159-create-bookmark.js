'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      percentace: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      mycoins: {
        type: Sequelize.INTEGER
      },
      myamount: {
        type: Sequelize.FLOAT
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model:"Users",
          key: "id"
        }
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
    await queryInterface.dropTable('Bookmarks');
  }
};