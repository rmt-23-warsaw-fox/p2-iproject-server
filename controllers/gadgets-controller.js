const axios = require("axios");
const apiGadgets = require("../axios/gadgets");

class Controller {
  static async getGadgets(req, res, next) {
    try {
      const { brands } = req.params;

      const result = await apiGadgets.get(`/brands/${brands}`);
      let gadgets = result.data.data.phones.slice(0, 4);
      for (let i = 0; i < gadgets.length; i++) {
        let temp = gadgets[i].detail.split("/");
        gadgets[i].detail = temp[temp.length - 1];
      }

      res.status(200).json(gadgets);
    } catch (error) {
      next(error);
    }
  }

  static async getGadget(req, res, next) {
    try {
      const { detail } = req.params;

      const result = await apiGadgets.get(`/${detail}`);
      let gadget = result.data.data;

      res.status(200).json(gadget);
    } catch (error) {
      next(error);
    }
  }

  static async getGadgetsForDashboard(req, res, next) {
    try {
      let gadgets = [];
      const apple = await apiGadgets.get("/brands/apple-phones-48");
      gadgets.push(apple.data.data.phones[0]);
      const samsung = await apiGadgets.get("/brands/samsung-phones-9");
      gadgets.push(samsung.data.data.phones[0]);
      const asus = await apiGadgets.get("/brands/asus-phones-46");
      gadgets.push(asus.data.data.phones[0]);
      const oppo = await apiGadgets.get("/brands/oppo-phones-82");
      gadgets.push(oppo.data.data.phones[0]);

      for (let i = 0; i < gadgets.length; i++) {
        let temp = gadgets[i].detail.split("/");
        gadgets[i].detail = temp[temp.length - 1];
      }

      res.status(200).json(gadgets);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
