var admin = require("firebase-admin");

var serviceAccount = require("../music-app-49be9-firebase-adminsdk-1asvo-ce7d34e457.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
