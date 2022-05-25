const errorHandler = (error, req, res, next) => {
  let code = 500
  let message = "Internal server error"

  if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
    code = 400
    message = error.errors[0].message
  }

  if(error.message === "Invalid email/password"){
    code = 401
    message = error.message
  }

  if(error.message === "Invalid token" || error.name === "JsonWebTokenError"){
    code = 403
    message = "Invalid token"
  }

  if(error.message === "Unauthorized"){
    code = 403
    message = error.message
  }

  if(error.message === "Not found"){
    code = 404
    message = error.message
  }

  res.status(code).json({
    error:message
  })
}

module.exports = errorHandler