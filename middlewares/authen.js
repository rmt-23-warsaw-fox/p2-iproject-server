const { readPayLoad } = require('../helpers/jwt')
const {User} = require('../models/index')

const authentication = async(req, res, next) => {
  try {
    console.log(67);
    const {access_token} = req.headers
    console.log(req.headers);
    const payload = readPayLoad(access_token)
    const findUser = await User.findByPk(+payload.id)
    console.log(findUser);
    if (!findUser) {
      throw new Error(401)
    }

    req.data = {
      id: findUser.id,
      username:findUser.username,
      role:findUser.role,
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