function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";

  if (err.message === "Invalid email") {
    code = 401;
    msg = err.message;
  }

  res.status(code).json({
    message: msg,
  });
}

module.exports = { errorHandler };
