
const errorHandler = (err, req, res, next)=>{
  let code = 500
  let message = 'Internal Server Error'
  console.log(err)
  
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

  if(err.message === "Invalid username/password"){
    code = 400
    message = err.message
  }

  if(err.message === "Please input your Username"){
    code = 400
    message = err.message
  }
  
  if(err.message === "Please input your Password"){
    code = 400
    message = err.message
  }
  if(err.message === 'match 404'){
    code =404
    message = 'Your match is not recorded'
  }
  if(err.message === "user_not_found"){
    code = 401
    message = "Invalid Token"
  }
  
  res.status(code).json({
   message : message
  })
}


module.exports = errorHandler