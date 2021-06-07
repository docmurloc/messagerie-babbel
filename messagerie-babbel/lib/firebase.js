import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const clientCredentials = process.env.FIREBASE_CLIENT;


if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;

export { firebase, clientCredentials }