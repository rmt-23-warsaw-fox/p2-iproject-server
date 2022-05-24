'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       }
      },
      PackageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Packages', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
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
    await queryInterface.dropTable('Buys');
  }
};