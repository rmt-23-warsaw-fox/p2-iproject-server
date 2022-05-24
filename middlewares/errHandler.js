function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal server error";
  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors[0].message;
  } else if (
    err.name === "JsonWebTokenError" ||
    err.message === "id_not_found_jwt"
  ) {
    code = 401;
    msg = "Invalid token";
  }
  res.status(code).json({
    message: msg,
  });
}

module.exports = errorHandler;
