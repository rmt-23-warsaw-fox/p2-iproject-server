const errorsHandler = (err, req, res, next) => {
    let code = 500
    let msg = "Internal server error"

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        code = 400;
        msg = err.errors.map((ele) => {
            return ele.message
        })
    } else if (err.message === `Destination not found`) {
        code = 404;
        msg = `Destination not found`
    } else if (err.message === `Order not found`) {
        code = 404;
        msg = `Order not found`
    } else if (err.message === `Order not created`) {
        code = 401
        msg = `Order not created`
    } else if (err.message === `Order failed`) {
        code = 401
        msg = `Order failed`
    }

    res.status(code).json({
        statusCode: code,
        message: msg
    })
}

module.exports = errorsHandler