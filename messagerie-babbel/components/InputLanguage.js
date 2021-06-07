import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { useAuth } from '../lib/auth';


import styles from './InputLanguage.module.css'

import {
    FirebaseDatabaseNode
} from "@react-firebase/database";

export default function InputLanguage() {

    const { user, setUserLanguage } = useAuth();

    const language = {
        en: 'English',
        fr: 'Français',
        de: 'Deutsch',
        th: 'ไทย',
    }

    const flag = {
        en: '/united-kingdom-flag-png-large.png',
        fr: '/france-flag-png-large.png',
        de: '/germany-flag-png-large.png',
        th: '/thailand-flag-png-large.png'
    }

    return (
        <div

        >
            <Dropdown>
                <Dropdown.Toggle
                    className={styles.toggle}
                >
                    <FirebaseDatabaseNode
                        path={"users/" + user?.uid + '/languageCode'}
                        orderByKey
                    >
                        {d => {
                            if (d.value) {
                                return (
                                    <div
                                        className={styles.horizontal}
                                    >
                                        Language &nbsp;
                                        <img src={flag[d.value]} alt="Flag" width="20" height="15"></img>
                                    </div>

                                );
                            } else {
                                return (
                                    <>
                                        Select a language
                            </>

                                );
                            }

                        }}
                    </FirebaseDatabaseNode>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div
                        className={styles.container}
                    >
                        {Object.keys(language).map((code) => {
                            return (
                                <Dropdown.Item
                                    key={code}
                                    onClick={() => {
                                        setUserLanguage(code)
                                    }}
                                >
                                    <div
                                        className={styles.flagItem}
                                    >
                                        <img src={flag[code]} alt="Flag" width="30" height="20"></img>
                                    </div>
                                </Dropdown.Item>
                            )
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}