"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = require("../product.json");
    products.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
