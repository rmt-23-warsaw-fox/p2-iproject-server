const { createToken, signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!req.headers) {
      throw { name: "notToken" };
    }
    const payLoad = signToken(access_token);
    const foundUser = await User.findByPk(payLoad.id);

    if (!foundUser) {
      throw { name: "invalidToken" };
    }

    req.user = {
      id: foundUser.id,
      username: foundUser.username,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authn };
