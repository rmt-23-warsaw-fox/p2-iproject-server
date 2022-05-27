'use strict';

const { createHash } = require('../helpers/bcrypt');

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
   const user = require('../data/user.json')
   user.forEach(el => {
     el.password = createHash(el.password)
     el.createdAt = new Date()
     el.updatedAt = new Date()
   })

   await queryInterface.bulkInsert("Users", user, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
