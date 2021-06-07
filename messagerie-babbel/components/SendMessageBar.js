

import React, { useState } from 'react';

import { getConversation } from '../context/Conversation';

import styles from './SendMessageBar.module.css';

import { useMediaQuery } from 'react-responsive';

export default function SendMessageBar({ language }) {
    const [message, setMessage] = useState('');

    const { conversation, sendMesssageTo } = getConversation();


    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMesssageTo(conversation, message, language);
            setMessage('');
        }
    }

    const isMobile = useMediaQuery({
        query: '(max-device-width: 800px)'
    })

    return (
        <div
            className={isMobile ? styles.containerMobile : styles.container}
        >
            <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={"type message..."}
                onKeyDown={onKeyDown}
                maxLength={90}
                type="text"
            />
            <button
                onClick={() => {
                    sendMesssageTo(conversation, message, language);
                    setMessage('');
                }}
            >
                Send message
            </button>
        </div>
    );
}