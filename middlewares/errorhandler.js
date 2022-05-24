
const errorHandler = (err, req, res, next)=>{
  let code = 500
  let message = 'Internal Server Error'
  console.log(err,"eaededffed")
 

  res.status(code).json({
    statusCode:code,
    error:{
      message: message,
    }
  })

}


module.exports = errorHandler