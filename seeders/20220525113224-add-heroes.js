"use strict"
const axios = require("axios")
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
    const { data } = await axios({
      method: "get",
      url: "https://api.opendota.com/api/heroStats",
    })
    data.forEach((el, i) => {
      for (const key in el) {
        if (key !== "localized_name" && key !== "img" && key !== "icon" && key !== "id")
          delete el[key]
      }
      el.createdAt = el.updatedAt = new Date()
    })
    // console.log(data)
    await queryInterface.bulkInsert("Heros", data)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Heros")
  },
}
