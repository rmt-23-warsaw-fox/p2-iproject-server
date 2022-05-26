"use strict";
function errorHandle (err, req, res, next) {
    let code = 500;
    let message = "Internal Server Error"
    //ERROR 401 UNAUTHORIZED
    if(err.name === "Invalid username/Password"){
        code = 401
        message = "Invalid Username/Password"
    }
    if(err.name === "JsonWebTokenError"){
        code = 401,
        message = "Invalid Token"
    }
    if(err.name === "Unauthorized"){
        code = 401,
        message = "User Not Found"
    }
    //ERROR 403 Forbidden
    if(err.name === "Product has been Choice"){
        code = 403,
        message = "Product has been Choice"
    }
    if(err.name === "NOT_ALLOWED"){
        code = 403,
        message = "NOT_ALLOWED"
    }
    //ERROR 404 Not Found
    if(err.name === "Your List Empty"){
        code = 404,
        message = "Your List Empty"
    }
    if(err.name === "Data Not Found"){
        code = 404,
        message = "Data Not Found"
    }
    if(err.name === "ID Product Not Found"){
        code = 404,
        message = "ID Product Not Found"
    }
    //ERROR 400 BAD REQUEST
    if(err.name === "SequelizeValidationError"){
        code = 400
        message = err.errors.map(el=> el.message).join(", ")
    }
    res.status(code).json({
        message
    })
}

module.exports = errorHandle