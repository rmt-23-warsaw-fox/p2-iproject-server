'use strict';
const {createHash} = require('../helper/hashPass')
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
     const dataUser = require("../User.json")
     dataUser.forEach(el=> {
       el.createdAt = el.updatedAt = new Date()
       el.password = createHash(el.password)
     })
     await queryInterface.bulkInsert('Users', dataUser, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkInsert('Users', null, {});

  }
};
