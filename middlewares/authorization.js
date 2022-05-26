const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authorizationToken = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token || access_token === "null") {
      next();
    } else {
      console.log("ada token");
      const decoded = verifyToken(access_token);
      console.log(decoded);
      next();
    }
  } catch (error) {
    console.log(error);
    if (error.message === "invalid signature") {
      console.log("invalid signature");
      req.User.statusToken = "invalid signature";
    }
    next();
  }
};

module.exports = {
  authorizationToken,
};
