
import React from 'react';

import { getConversation } from '../context/Conversation';

import {
    FirebaseDatabaseNode,
} from "@react-firebase/database";

export default function HeaderConversation() {
    const { conversation } = getConversation();

    return (
        <>
            <FirebaseDatabaseNode
                path={'users/' + conversation}
                orderByKey
            >
                {d => {

                    if (d.value) {
                        return (
                            <>
                                <p>{d.value.name}</p>
                            </>

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
        </>
    );
}