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
  } else if (err.name === "notToken") {
      code = 403
      msg = "access forbidden / must login"
  } else if(err.name === "accountIsNotActive") {
      code = 403
      msg = "please check email to activate"
  } else if(err.name === "require") {
    code = 404,
    msg = "email & password required"
  }

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
};

module.exports = handlingError;
