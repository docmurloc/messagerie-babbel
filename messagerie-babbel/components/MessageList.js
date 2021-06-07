import React, { useEffect } from 'react';

import Message from './Message';


export default function MessageList({ value, whenChange }) {

    useEffect(() => {
        whenChange()
    }, [value]);

    return (
        <>
            {Object.keys(value).map((messageId) => {
                return (
                    <Message key={messageId} messageId={messageId} {...value[messageId]} />
                )
            })}
        </>

    );
}