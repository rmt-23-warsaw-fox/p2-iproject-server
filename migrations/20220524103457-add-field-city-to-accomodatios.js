'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('Accomodations', "city", { type: Sequelize.STRING })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.removeColumn('Accomodations', "city")

  }
};
