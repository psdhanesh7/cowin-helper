const admin = require("firebase-admin");
const keys = require('./config/keys');

// const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(Buffer.from(keys.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii')))
});

module.exports = admin;
