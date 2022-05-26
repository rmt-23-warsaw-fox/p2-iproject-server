'use strict'

function errorHandler(err, req, res, next) {
    let code = 500
    let message = `Internal Server Error`

    if (err.message === `failed to create user`) {
        code = 400
        message = `failed to create`
    }

    if (err.name === `SequelizeValidationError`) {
        code = 400;
        message = err.errors.map(error => error.message)
    }

    if (err.name === `JsonWebTokenError`) {
        code = 401
        message = `Invalid Token`
    }

    if (err.message === `USER NOT FOUND`) {
        code = 401
        message = `Invalid email or password`
    }

    if (err.message === 'Destination already in your favorite') {
        code = 400
        message = `This destination already in your favorite`
    }

    if (err.message === `Email already registered`) {
        code = 400
        message = `Email already registered`
    }

    if (err.message === 'DESTINATION NOT FOUND') {
        code = 404
        message = 'DESTINATION NOT FOUND'
    }


    res.status(code).json({
        statusCode: code,
        message
    })
}


module.exports = errorHandler