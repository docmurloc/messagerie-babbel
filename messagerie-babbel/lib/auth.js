import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useFirebaseAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const newUser = formatUser(rawUser);

            setUser(newUser);

            setLoading(false);
            return newUser;
        } else {
            setUser(false);
            setLoading(false);
            return false;
        }
    };

    const signinWithGoogle = (redirect) => {
        setLoading(true);
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
                handleUser(response.user);
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    };

    const setUserLanguage = (languageCode) => {
        const language = {
            languageCode: languageCode
        };

        firebase.database().ref('users/' + user.uid).update(language);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signinWithGoogle,
        signout,
        setUserLanguage
    };
}

const formatUser = (user) => {

    const newUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };

    firebase.database().ref('users/' + user.uid).update(newUser);

    return newUser;
};