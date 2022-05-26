const { User } = require('../models/index')
const { decodeToken } = require('../helpers/jwt')

const auth = async (request, response, next) => {
  try {
    // get token from header
    const { access_token } = request.headers

    // convert(decode) data/payload from token
    const payload = decodeToken(access_token)

    // validation with data in database and data/payload from token
    const foundUser = await User.findByPk(+payload.id)

    request.additionalData = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { auth }