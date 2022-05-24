const handlingError = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "email already in use";
  } else if (err.name === "userNotFound") {
    code = 404;
    msg = "User not Found"
  } else if (err.name === "passIncorrect") {
      code = 400
      msg = "Password Incorect"
  }

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
};

module.exports = handlingError;
