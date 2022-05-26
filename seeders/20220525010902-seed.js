'use strict';

const data = require('../data/doctors.json');
const { hashed } = require('../helpers/bcrypt');
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
   data.forEach(x => {
     x.createdAt = new Date();
     x.updatedAt = new Date();
     x.password = hashed(x.password)
   })
   await queryInterface.bulkInsert('Doctors', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
