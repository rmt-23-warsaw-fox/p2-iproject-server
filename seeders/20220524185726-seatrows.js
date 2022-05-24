"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const rows = [
      { row: "A" },
      { row: "B" },
      { row: "C" },
      { row: "D" },
      { row: "E" },
      { row: "F" },
    ];
    rows.forEach((row) => {
      row.createdAt = new Date();
      row.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("SeatRows", rows, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SeatRows", null, {});
  },
};
