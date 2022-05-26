const { tokenToPayload } = require("../helpers/jwt");
const { Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = tokenToPayload(access_token);

    const customerFound = await Customer.findByPk(payload.CustomerId);

    if (!customerFound) {
      throw { statusCode: 401 };
    } else {
      req.user = {
        CustomerId: customerFound.id,
        email: customerFound.username,
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
