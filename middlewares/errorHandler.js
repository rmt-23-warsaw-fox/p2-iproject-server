function errorHandler(err, req, res, next) {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";
  let error = [];
  if (err.message === "wrong email") {
    code = 401;
    message = "please check your email";
  } else if (err.message === "wrong password") {
    code = 401;
    message = "please check your password";
  } else if (
    err.name === "JsonWebTokenError" ||
    err.message === "User not found"
  ) {
    code = 401;
    message = "Unauthorized";
  } else if (err.message === "Not Found") {
    code = 404;
    message = "Not Found";
  } else if (err.message === "Not allowed") {
    code = 403;
    message = "Forbidden to access";
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = "bad request";
    error = err.errors.map((el) => {
      return { message: el.message, path: el.path };
    });
  } else if (err.message === "Already Favorite") {
    message = "this food already your favorite";
  } else if (err.message === "Not Your Favorite") {
    message = "this food is not your favorite";
  }
  let errors = { message, error };
  if (error.length === 0) {
    delete errors.error;
  }
  res.status(code).json({
    statusCode: code,
    errors,
  });
}

module.exports = { errorHandler };
