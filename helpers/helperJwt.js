const jwt = require('jsonwebtoken');
const secretWord = 'BlackDragonFatalis';
function tokenMakerFromPayload(payload) {
  return jwt.sign(payload, secretWord, {
    //? pastikan untuk membuat waktu kadaluarsa
    // expiresIn: '1h',
  });
}

function payloadReaderFromToken(token) {
  return jwt.verify(token, secretWord);
}

module.exports = { tokenMakerFromPayload, payloadReaderFromToken };
