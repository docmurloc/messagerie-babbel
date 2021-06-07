
import React from 'react';

import { getConversation } from '../context/Conversation';

import styles from './HeaderConversation.module.css'

import {
    FirebaseDatabaseNode,
} from "@react-firebase/database";

export default function HeaderConversation() {
    const { conversation } = getConversation();

    return (

        <FirebaseDatabaseNode
            path={'users/' + conversation}
            orderByKey
        >
            {d => {

                if (d.value) {
                    return (
                        <div
                            className={styles.container}
                        >
                            <img src={d.value.photoUrl} className={styles.imageProfile} height={20} ></img>
                            <p
                                className={styles.text}
                            >
                                {d.value.name}
                            </p>
                        </div>


                    );
                } else {
                    return (
                        <div
                        >
                            Select a converstion
                        </div>
                    );
                }

            }}
        </FirebaseDatabaseNode>
    );
}