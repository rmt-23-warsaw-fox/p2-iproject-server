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
  }

  res.status(code).json({
    statusCode: code,
    error: {
      message: msg,
    },
  })
}

module.exports = errorHandler
