const { default: axios } = require("axios")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const hashPass = (password) => {
  return bcrypt.hashSync(password, 10)
}

const comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}

const readToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const scanDotaId = async (id) => {
  try {
    let status
    const { data } = await axios({
      method: "get",
      url: `https://api.opendota.com/api/players/${id}`,
    })
    data.profile ? (status = true) : (status = false)

    return status
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  hashPass,
  comparePass,
  createToken,
  readToken,
  scanDotaId,
}
