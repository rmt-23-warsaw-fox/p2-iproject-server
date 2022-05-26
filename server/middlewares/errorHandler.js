const errorHandling = (err, request, response, next) => {
  let status = 500
  let message = 'Internal Server Error'

  if (err.message === 'unauthorized') {
    status = 401
    message = 'Email or password is invalid.'
  } else if (err.message === 'user_not_found') {
    status = 404
    message = 'User is not found'
  } else if (err.name === 'JsonWebTokenError') {
    status = 401
    message = "You're not login."
  } else if(err.name === 'SequelizeValidationError') {
    status = 400
    message = err.errors[0].message
  } else if (err.message === 'post_not_found') {
    status = 404
    message = 'Post is not found.'
  }

  console.log(err);

  response.status(status).json({
    message
  })
}

module.exports = {errorHandling}