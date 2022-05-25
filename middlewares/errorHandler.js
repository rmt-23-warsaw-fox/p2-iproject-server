function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";

  if (err.message === "Invalid email") {
    code = 401;
    msg = err.message;
  } else if (err.message === "Invalid password") {
    code = 401;
    msg = err.message;
  } else if (err.message === "Product not found") {
    code = 400;
    msg = err.message;
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    let error = err.errors.map((el) => {
      return el.message;
    });
    msg = error;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    let error = err.errors.map((el) => {
      return el.message;
    });
    msg = error;
  }

  res.status(code).json({
    message: msg,
  });
}

module.exports = { errorHandler };
