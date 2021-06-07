import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from '../lib/firebase';

import { useAuth } from '../lib/auth';

const conversationContext = createContext();

export function ConversationProvider({ children }) {
    const conversation = useConversation();
    return <conversationContext.Provider value={conversation}>{children}</conversationContext.Provider>;
}

export const getConversation = () => {
    return useContext(conversationContext);
};

function useConversation() {
    const [conversation, setConversation] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        if (conversation) {
            addContact(conversation);
        }
    }, [conversation])

    const sendMesssageTo = (uid, message, language) => {
        const newMessage = {
            uid: user.uid,
            originalMessage: message,
            originalLanguage: language
        }

        newMessage[language] = message;
        firebase.database().ref('users/' + user.uid + '/conversations/' + uid).push(newMessage);

        if (user.uid !== uid) {
            firebase.database().ref('users/' + uid + '/conversations/' + user.uid).push(newMessage);
        }
    }

    const addContact = (contact) => {

        const contactUpdate1 = {};
        contactUpdate1[contact] = true;

        const contactUpdate2 = {};
        contactUpdate2[user.uid] = true;

        firebase.database().ref('users/' + user.uid + '/contacts').update(contactUpdate1);
        firebase.database().ref('users/' + contact + '/contacts').update(contactUpdate2);
    }

    return {
        conversation,
        setConversation,
        sendMesssageTo
    };
}