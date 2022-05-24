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
     const majors = require('../data/majors.json')
     majors.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     })
 
     await queryInterface.bulkInsert('Majors', majors, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Majors', null, {});
  }
};
