const bcryptjs = require('bcryptjs')

const hashed = (password) => {
    return bcryptjs.hashSync(password, 10)
};

const compareHash = (inputedPassword, databaseHash) => {
    return bcryptjs.compareSync(inputedPassword, databaseHash)
}

module.exports = {
    hashed,
    compareHash
}