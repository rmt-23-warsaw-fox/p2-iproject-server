const errorHandler = async (err, req, res, next) => {
  let code = 500;
  let msg = 'Internal Server Error';

  if (err.code === 'ERR_BAD_REQUEST') {
    code = err.response.status;
    msg = err.response.data.status_message;
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorHandler;
