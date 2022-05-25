const { readPayLoad } = require('../helpers')
const {User} = require('../models/index')

const authentication = async(req, res, next) => {
  try {
    const {access_token} = req.headers
    const payload = readPayLoad(access_token)
    const findUser = await User.findByPk(+payload.id)
    if (!findUser) {
      throw new Error(401)
    }

    req.data = {
      id: findUser.id,
      username:findUser.username,
    }
    next()
  } catch(err) {
    if(err.name == 'JsonWebTokenError') {
      err.message = '401'
    }

    next(err)
  }
}

module.exports = authentication