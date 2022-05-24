const errorHandlers = (err, req, res, next) => {
  let code, msg;
  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors.map((e) => e.message);
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = "Email has been registered";
      break;
    case "JsonWebTokenError":
      code = 401;
      msg = "Invalid token";
      break;
    case "EMAIL_OR_PASSWORD_NOT_FOUND":
      code = 401;
      msg = "Error user not found or password not matched";
      break;
    default:
      code = 500;
      msg = "Internal Server Error";
      break;
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorHandlers;
