const admin = require("firebase-admin");
const keys = require('./config/keys');

// const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(Buffer.from(keys.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii')))
});

// const firebaseAdminSdk = require('firebase-admin'),
//     firebaseAdminApp = firebaseAdminSdk.initializeApp({credential: firebaseAdminSdk.credential.cert(
//       JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii')))
// });




module.exports = admin;
