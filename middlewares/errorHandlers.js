"use strict"
const errorHandlres = async(err, req, res, next) =>{
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        const msg = err.errors.map((e) =>{
            return{
                message:e.message
            }
        })
        res.status(400).json({
            message:msg
        })
    }  else {
        res.status(500).json({
            statusCode: 500,
            error: {
                message: "Internal Server Error",
            },
        });
    }
}

module.exports = errorHandlres