
const errorHandler = (err, req, res, next)=>{
  let code = 500
  let message = 'Internal Server Error'
  console.log(err,"eaededffed")
  
  if(err.name === 'SequelizeValidationError'){
    code = 400
    message = err.errors.map(el=>el.message)[0]
  }
  if(err.name === 'SequelizeUniqueConstraintError'){
    code = 400
    message = err.errors.map(el=>el.message)[0]
  }
  if(err.name === 'SequelizeConstraintError'){
    code = 400
    message = err.errors.map(el=>el.message)[0]
  }
  if(err.message === "ign_required"){
    code = 400
    message = "IGN required"
  }
  if(err.message === "tagline_required"){
    code = 400
    message = "Tagline required"
  }
  if(err.message === "valo_account_not_found"){
    code = 400
    message = "Invalid IGN or Tagline"
  }

  res.status(code).json({
   message : message
  })

}


module.exports = errorHandler