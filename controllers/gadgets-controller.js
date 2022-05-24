const axios = require("axios");
const apiGadgets = require("../axios/gadgets");

class Controller {
  static async getGadgets(req, res, next) {
    try {
      const { brands } = req.params;

      const result = await apiGadgets.get(`/brands/${brands}`);
      let gadgets = result.data.data.phones.slice(0, 8);

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
}

module.exports = Controller;
