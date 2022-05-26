'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const destinations = require('../data/destinations.json')

    destinations.forEach(destination => {
      destination.createdAt = new Date()
      destination.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Destinations', destinations, {})
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Destinations', null, {});
  }
};
