const {convertToken} = require('../helpers/jwt');
const {Patient} = require('../models')

const authentication = async (req, res, next) => {
    try{
        const {access_token} = req.headers
        const payload = convertToken(access_token)
        const targetId = payload.id
        console.log(payload, '<<<<< payload')
        console.log('<<<<< authorization jalan')
        const foundUser = await Patient.findByPk(targetId)
        if(!foundUser) {
            throw {name: 'Unauthorized', statusCode: 401}
        } else {
            req.user = {
                id:foundUser.id,
                username:foundUser.username,
            }
        }
        next()
    } catch (err){
        next (err)
    }
}

module.exports = authentication