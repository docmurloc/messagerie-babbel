import '../styles/globals.css'

import { AuthProvider } from '../lib/auth';

import { firebase, clientCredentials } from '../lib/firebase';

import { FirebaseDatabaseProvider } from "@react-firebase/database";

import {
  FirebaseAuthProvider,
} from "@react-firebase/auth";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAuthProvider {...clientCredentials} firebase={firebase}>
      <AuthProvider>
        <FirebaseDatabaseProvider {...clientCredentials} firebase={firebase}>
          <Component {...pageProps} />
        </FirebaseDatabaseProvider>
      </AuthProvider>
    </FirebaseAuthProvider>
  )
}

export default MyApp
