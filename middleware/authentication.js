const { confirmToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    const payload = confirmToken(access_token)
    const foundUser = await User.findByPk(+payload.id)

    if(!foundUser) {
      throw new Error("NOT_FOUND")
    }

    req.moreData = {
      id: foundUser.id,
      email: foundUser.email
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication