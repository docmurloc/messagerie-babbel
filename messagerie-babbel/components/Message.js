import React from 'react';

import {
    FirebaseDatabaseNode
} from "@react-firebase/database";

import { useAuth } from '../lib/auth';

import { getConversation } from '../context/Conversation';


import styles from './Message.module.css'

function callTranslation(uid, messageId, conversationId, language) {

    const bodyRequest = JSON.stringify({
        uid: uid,
        messageId: messageId,
        language: language,
        conversationId: conversationId,
    });

    fetch(`/api/translate`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: bodyRequest,
    })
        .catch((error) => {
            console.error('error :', error);
        });

}


export default function Message(props) {

    const { user } = useAuth();

    const { conversation } = getConversation();

    const flag = {
        en: '/united-kingdom-flag-png-large.png',
        fr: '/france-flag-png-large.png',
        de: '/germany-flag-png-large.png',
        th: '/thailand-flag-png-large.png'
    }

    return (
        <>
            <div
                className={props.uid == user.uid ? styles.container_sent : styles.container_received}
            >
                <div
                    className={props.uid == user.uid ? styles.container_sent_original : styles.container_received_original}
                >
                    <div
                        className={styles.horizontal}
                    >
                        <p>{props.originalMessage}</p>
                        <img src={flag[props.originalLanguage]} alt="Flag" width="20" height="15"></img>
                    </div>
                </div>
                <FirebaseDatabaseNode
                    path={"users/" + user?.uid + '/languageCode'}
                    orderByKey
                >
                    {d => {
                        if (d.value && props[d.value]) {
                            return (
                                <>
                                    <div
                                        className={styles.horizontal}
                                    >
                                        <p>{props[d.value]}</p>
                                        <img src={flag[d.value]} alt="Flag" width="20" height="15"></img>
                                    </div>
                                </>

                            );
                        } else if (d.value && !props[d.value]) {
                            callTranslation(user.uid, props.messageId, conversation, d.value);
                            return (
                                <>
                                    <p>message is not translate yet</p>
                                </>

                            );
                        } else {
                            return (
                                <>
                                    <p>Loading...</p>
                                </>
                            )
                        }

                    }}
                </FirebaseDatabaseNode>

            </div>

        </>
    )
}