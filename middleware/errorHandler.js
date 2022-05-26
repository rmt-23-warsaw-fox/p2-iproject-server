const errorHandler = async (err, req, res, next) => {
  let code = 500;
  let msg = 'Internal Server Error';

  if (err.code === 'ERR_BAD_REQUEST') {
    code = err.response.status;
    msg = err.response.data.status_message;
  } else if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    code = 400;
    msg = err.errors.map((el) => el.message).join(', ');
  } else if (err.name === 'JsonWebTokenError' || err.message === 'NOT_FOUND') {
    code = 401;
    msg = 'Invalid token';
  } else if (err.message === 'USER_NOT_FOUND' || err.message === 'INCORRECT_PASSWORD') {
    code = 401;
    msg = 'Invalid username/password';
  } else if (err.message === 'DUPLICATE') {
    code = 401
    msg = `You can't add the same movie twice`
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorHandler;
