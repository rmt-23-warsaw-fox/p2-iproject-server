"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../categories.json");
    categories.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
