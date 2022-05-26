const { readPayload } = require("../helpers/jwt");
const { User, Profile_Picture } = require("../models/index");
async function authenticate(req, res, next) {
  try {
    const token = req.headers.access_token;
    const payload = readPayload(token);
    const foundUser = await User.findOne({
      where: {
        id: payload.id,
      },
      include: [Profile_Picture],
    });
    if (!foundUser) {
      throw new Error("Invalid token");
    }
    req.userData = {
      id: foundUser.id,
      displayName: foundUser.displayName,
      email: foundUser.email,
      Profile_Picture: foundUser.Profile_Picture,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = authenticate;
