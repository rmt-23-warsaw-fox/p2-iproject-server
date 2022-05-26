const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("../music-app-49be9-firebase-adminsdk-1asvo-ce7d34e457.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports = {db};