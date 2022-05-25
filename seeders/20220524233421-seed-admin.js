'use strict';

const { hashPassword } = require('../helpers');

module.exports = {
  async up (queryInterface, Sequelize) {
    const admin = [{
      email: "admin@gmail.com",
      password: hashPassword('123456'),
      firstName: "Dandi",
      lastName: "Rahmadani",
      phoneNumber: "081234567890",
      address: "Jalan Kenangan Gg. Rindu",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
     await queryInterface.bulkInsert('Admins', admin, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
