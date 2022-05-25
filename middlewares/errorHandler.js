const errorHandler = async (err, req, res, next) => {
  let code = 500
  let msg = "Internal Server Error"

  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400
    const errors = err.errors.map((el) => el.message)
    msg = errors.join(", ")
  } else if (err.message === "dota") {
    code = 400
    msg = "We couldn't find this Dota id"
  } else if (err.message === "email") {
    code = 400
    msg = "Email is required"
  } else if (err.message === "password") {
    code = 400
    msg = "Password is required"
  } else if (err.message === "invalid") {
    code = 401
    msg = "Invalid email/password"
  }
  res.status(code).json({
    statusCode: code,
    error: {
      message: msg,
    },
  })
}

module.exports = errorHandler
