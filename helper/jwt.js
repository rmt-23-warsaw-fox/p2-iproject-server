const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;
//const secretKey = "String1";

const payloadToToken = (payload) => {
    return jwt.sign(payload, secretKey, {
        expiresIn: "1d",
    });
};

const tokenToPayload = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { payloadToToken, tokenToPayload };