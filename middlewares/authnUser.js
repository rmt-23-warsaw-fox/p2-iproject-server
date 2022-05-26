const { verifyToken } = require('../helpers');
const { User } = require('../models');

const authnUser = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const payload = verifyToken(access_token);

        const user = await User.findByPk(+payload.id);
        if(!user) {
            throw { name: "USER_NOT_FOUND" }
        }

        req.currentUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address
        }

        next()
    } catch (err) {
        next(err)
    }
};

module.exports = authnUser;