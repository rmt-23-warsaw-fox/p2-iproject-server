'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const types = [
      {
        name: "Homestay"
      },
      {
        name: "Apartement"
      },
      {
        name: "Hotel"
      },
      {
        name: "Motel"
      },
      {
        name: "Farmstay"
      }
    ]
    types.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('Types', types,{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  }
};
