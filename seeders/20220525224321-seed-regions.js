'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const regions = require('../data/regions.json')
    regions.forEach(region => {
      region.createdAt = new Date()
      region.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Regions', regions, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Regions', null, {});
  }
};
