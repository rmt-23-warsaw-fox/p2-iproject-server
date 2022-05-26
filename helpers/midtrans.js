const midtransClient = require("midtrans-client");
const serverKey = "SB-Mid-server-K-YxP7I6ClZp53lPe33E9tdW";
const clientKey = "SB-Mid-client-8Y0mGlXMG5pcGVds";
//midtrans
// Create Core API instance
let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey,
  clientKey,
});

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey,
  clientKey,
});

module.exports = { coreApi, apiClient };
