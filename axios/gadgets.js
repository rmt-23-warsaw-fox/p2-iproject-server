const axios = require("axios");

const apiGadgets = axios.create({
  baseURL: "https://api-mobilespecs.azharimm.site/v2",
});

module.exports = apiGadgets;
