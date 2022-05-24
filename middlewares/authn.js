const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");
async function isLogin(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const user = await User.findOne({
      where: {
        id: payload.UserId,
      },
    });
    if (!user) {
      throw new Error("id_not_found_jwt");
    }
    req.dataUser = {
      UserId: user.id,
      UserEmail: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = isLogin;
