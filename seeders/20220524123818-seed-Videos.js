'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const packages = require('../data/packages.json')
     packages.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     })
 
     await queryInterface.bulkInsert('Packages', packages, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Packages', null, {});
  }
};
