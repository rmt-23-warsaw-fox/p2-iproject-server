const midtransClient = require("midtrans-client");
const serverKey = process.env.MAP_SERVER_KEY;
const clientKey = process.env.MAP_CLIENT_KEY;
//midtrans
// Create Core API instance
let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey,
  clientKey,
});

module.exports = { coreApi };
