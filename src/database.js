// Import
const admin = require('firebase-admin');

const serviceAccount = require('../secrets/hamsters-firebase.json');

function connect() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });

      const db = admin.firestore()
      return db
}


module.exports = { connect }