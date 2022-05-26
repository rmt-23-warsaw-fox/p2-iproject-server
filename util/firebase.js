const firebase = require("firebase");

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt_FyQfv-zQ0hsb9G1uw56v7zTjFEbvqw",
  authDomain: "music-app-49be9.firebaseapp.com",
  projectId: "music-app-49be9",
  storageBucket: "music-app-49be9.appspot.com",
  messagingSenderId: "385415163717",
  appId: "1:385415163717:web:1d1639727c6fcb98afd82c",
  measurementId: "G-Q6EP9N2CXL",
};

firebase.initializeApp(firebaseConfig);
module.exports = {firebase};