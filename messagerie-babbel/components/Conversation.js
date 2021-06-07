import React, { useRef, useEffect } from 'react';

import styles from './Conversation.module.css'

import { getConversation } from '../context/Conversation';

import { useAuth } from '../lib/auth';

import MessageList from './MessageList';

import SendMessageBar from '../components/SendMessageBar';
import HeaderConversation from '../components/HeaderConversation';

import {
    FirebaseDatabaseNode,
} from "@react-firebase/database";

import { useMediaQuery } from 'react-responsive';


export default function Conversation() {

    const { conversation } = getConversation();
    const { user } = useAuth();

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [conversation]);

    const isMobile = useMediaQuery({
        query: '(max-device-width: 800px)'
    })


    if (user && conversation) {
        return (
            <div
                className={styles.container}
            >
                {isMobile ? <></> : <HeaderConversation />}
                <div
                    className={styles.main}
                >
                    <div
                        className={isMobile ? styles.scrollMobile : styles.scroll}
                    >
                        <FirebaseDatabaseNode
                            path={'users/' + user.uid + '/conversations/' + conversation}
                            orderByKey
                        >
                            {d => {

                                if (d.value) {
                                    return (
                                        <MessageList value={d.value} whenChange={() => scrollToBottom()} />

                                    );
                                } else {
                                    return (
                                        <>
                                            <p>loading</p>
                                        </>

                                    );
                                }

                            }}
                        </FirebaseDatabaseNode>
                        <div ref={messagesEndRef} />
                    </div>
                    <FirebaseDatabaseNode
                        path={"users/" + user?.uid + '/languageCode'}
                        orderByKey
                    >
                        {d => {
                            if (d.value) {
                                return (
                                    <>
                                        <SendMessageBar language={d.value} />
                                    </>

                                );
                            } else {
                                return (
                                    <>
                                        No language selected
                                </>

                                );
                            }

                        }}
                    </FirebaseDatabaseNode>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className={styles.container_empty}
            >
                {isMobile ? <></> : <p>Select a conversation</p>}
            </div>
        )
    }
}