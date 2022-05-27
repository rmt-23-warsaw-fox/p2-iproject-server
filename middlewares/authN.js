const { decode } = require("../helpers/jwt");
const { User } = require("../models");

async function isLoggedIn(req, res, next) {
  try {
    const access_token = req.headers.access_token;
    // console.log(req.headers);
    const payload = decode(access_token);
    const id = payload.id;
    // console.log(id);
    const foundUser = await User.findOne({
      where: {
        id,
      },
    });
    // console.log(foundUser);
    if (!foundUser) {
      throw new Error("Invalid token");
    }
    req.pass = {
      id: foundUser.id,
      role: foundUser.role,
    };
    next();
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

module.exports = isLoggedIn;
