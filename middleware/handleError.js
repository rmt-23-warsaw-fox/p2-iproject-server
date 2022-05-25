"use strict";
function errorHandle (err, req, res, next) {
    console.log(err);
    let code = 500;
    let message = "Internal Server Error"
    if(err.name === "Invalid username/Password"){
        code = 400
        message = "Invalid Username/Password"
    }

    res.status(code).json({
        message
    })
}

module.exports = errorHandle