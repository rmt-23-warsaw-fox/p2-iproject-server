const errorHandlers = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    code = 400;
    if (err.errors) {
      message = err.errors[0].message;
    }
  }

  if (
    err.message === "Email is required" ||
    err.message === "Password is required"
  ) {
    code = 400;
    message = err.message;
  }

  if (err.message === "Authentication failed, please relogin") {
    code = 401;
    message = err.message;
  }

  if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  }

  if (err.message === "Email or password is incorrect") {
    code = 404;
    message = err.message;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    code = 409;
    message = err.errors[0].message;
  }

  // res.status(code).json({
  //   message: err,
  // });
  res.status(code).json({
    message,
  });
};

module.exports = errorHandlers;
