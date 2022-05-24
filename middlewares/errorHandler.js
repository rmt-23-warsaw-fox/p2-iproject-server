
const errorHandler = (err, req, res, next) => {
  let code = 500
  let msg = 'Internal Server Error'

  if (err.message === '401') {
    code = 401
    if (err.login) {
      msg = 'Invalid email or password'
    } else {
      msg = 'Unauthorized'
    }
  } else if (err.message === '403') {
    code = 403
    msg = 'Forbidden'
  } else if (err.message === '404') {
    code = 404
    msg = 'error not found'
  }

  if (err.errors) {
    code = 400
    msg = err.errors.map(el => el.message).join(',')
  }

  res.status(code).json({
    statusCode: code,
    message: msg
  })
}

module.exports = errorHandler