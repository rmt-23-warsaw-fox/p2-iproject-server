'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const accomodations = require('./accomodation.json');
    accomodations.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Accomodations", accomodations, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accomodations', null, {});
  }
};
