

function errorHandler(err, req, res, next) {
  let code = 500
  let message = 'Internal server error'

  console.log(err);

  if(err.name === `Song not found`) {
    code = 404
    message = err.message
  }

  if(err.name === `Radio not found`) {
    code = 404
    message = err.message
  }
  
  res.status(code).json({message})
}

module.exports = errorHandler;