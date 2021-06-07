import * as firebaseAdmin from 'firebase-admin';

var serviceAccount = require('/home/pierre/Documents/apiKey/react-firebase-auth-admin.json');


if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(process.env.FIREBASE_ADMIN),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}

export { firebaseAdmin };