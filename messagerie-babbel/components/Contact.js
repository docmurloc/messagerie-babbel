import React from 'react';

import styles from './Contact.module.css'

import { getConversation } from '../context/Conversation';

import {
    FirebaseDatabaseNode
} from "@react-firebase/database";

function showMyself(email, search) {

    if (search == "" || search == null) {
        return true;
    }

    return email.includes(search);
}

export default function Contact({ uid, search }) {

    const { conversation, setConversation } = getConversation();

    const path = "users/" + uid

    return (

        <FirebaseDatabaseNode
            path={path}
        >
            {d => {
                if (d.value) {
                    if (showMyself(d.value.email, search)) {
                        return (
                            <div
                                className={conversation == uid ? styles.containerSelected : styles.container}
                                onClick={() => setConversation(uid)}
                            >

                                <img src={d.value.photoUrl} className={styles.imageProfile} ></img>
                                <div>
                                    <p>{d.value.email}</p>
                                    <p>{d.value.name}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <>
                            </>
                        )
                    }

                } else {
                    return (
                        <>
                            <p>loading</p>
                        </>
                    )

                }
            }}


        </FirebaseDatabaseNode>
    )
}