
const errorHandler = (err,req,res,next) => {
    // console.log(err)
    // res.send(err.name)
    console.log(err)
    // console.log(err.name, '<<<<<<< err.name pada err handler')
    switch (err.name) {
        case 'JsonWebTokenError':
        case 'Unauthorized':
            res.status(401).json({
                message: 'Invalid identification token'
            })
            break;

        case 'SequelizeUniqueConstraintError':
            console.log(err, '<<<< error constraint')
            res.status(400).json({
                message: err.errors[0].message
            })
            break;

        case 'SequelizeValidationError':
            console.log(err, '<<<< error validation')
            res.status(400).json({
                statusCode : 400,
                message: err.errors[0].message
            })
            break;

        case 'SequelizeDatabaseError' :
            console.log(err, '<<<< error validation')
            res.status(400).json({
                statusCode : 400,
                message: err.errors[0].message
            })
            break;

        case 'TokenExpiredError' :
            console.log(err, '<<<< error validation')
            res.status(401).json({
                statusCode : 401,
                message: err.errors[0].message + 'jwt expired'
            })
            break;

        case 'SequelizeForeignKeyConstraintError':
            //console.log(err, '<<<< foreign keyerror constraint')
            res.status(400).json({
                statusCode : 400,
                message: err.parent.detail,
            })
            break;

        case 'P_NOT_FOUND':
        case 'D_NOT_FOUND':
            res.status(401).json({
                statusCode: err.statusCode,
                message: `Invalid username/password`
            })
            break;

        default:
            console.log(err)
            res.status(500).json(err)
            break;
    }
}

module.exports = errorHandler