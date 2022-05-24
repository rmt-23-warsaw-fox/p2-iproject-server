const { tokenToPayload } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const {access_token} = req.headers;
    const payload = tokenToPayload(access_token);
    // console.log(payload);
    const userFound = await User.findByPk(payload.id);

    if (!userFound) {
      throw { statusCode: 401 };
    } else {
      req.user = {
        id: userFound.id,
        role: userFound.role
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
