const { verifyToken } = require("../helpers");
const { User } = require("../models");

const authN = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    const payload = verifyToken(access_token);

    const currentUser = await User.findByPk(payload.id);

    if (!currentUser) {
      throw new Error({ name: "User not found", message: "user not found" });
    }

    req.additionalData = {
      id: currentUser.id,
      fullname: currentUser.fullname,
      email: currentUser.email,
    };

    next();
  } catch (error) {
    let code = 500;
    let message = "Internal Server Error";

    if (error.name === "JsonWebTokenError") {
      code = 401;
      message = "Invalid JSON Web Token";
    }

    res.status(code).json({
      code,
      message,
    });
  }
};

module.exports = authN