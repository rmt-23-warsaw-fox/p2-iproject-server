'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn("Wishlists", 'TypeId', { type: Sequelize.INTEGER })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Wishlists", 'TypeId')

  }
};
