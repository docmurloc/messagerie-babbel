import React, { useState } from 'react';

import {
    FirebaseDatabaseNode
} from "@react-firebase/database";

import Contact from './Contact';

import styles from './Users.module.css'

import InputBar from './InputBar';

import Dropdown from 'react-bootstrap/Dropdown';

import HeaderConversation from '../components/HeaderConversation';


import MediaQuery from 'react-responsive';

export default function Users() {

    const [search, setSearch] = useState('');

    return (

        <MediaQuery maxDeviceWidth='800px'>
            {(isMobile) =>

                isMobile ?
                    (
                        <Dropdown
                            className={styles.toggle}
                        >
                            <Dropdown.Toggle
                                className={styles.toggle}
                            >
                                <HeaderConversation />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className={styles.containerMobile}>

                                    <div className={styles.user}>
                                        <InputBar value={search} setValue={setSearch} placeholder={'search user by mail'} />
                                    </div>
                                    <div className={styles.scrollMobile} >
                                        <FirebaseDatabaseNode
                                            path="users/"
                                            orderByKey
                                        >
                                            {d => {

                                                if (d.value) {
                                                    return (
                                                        <>
                                                            {Object.keys(d.value).map((user) => {
                                                                return (
                                                                    <Contact key={user} uid={user} search={search} />
                                                                )
                                                            })}
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
                                    </div>
                                </div>

                            </Dropdown.Menu>
                        </Dropdown>

                    )
                    :

                    (<div className={styles.container}>
                        <div className={styles.user}>
                            <InputBar value={search} setValue={setSearch} placeholder={'search user by mail'} />
                        </div>
                        <div className={styles.scroll} >
                            <FirebaseDatabaseNode
                                path="users/"
                                orderByKey
                            >
                                {d => {

                                    if (d.value) {
                                        return (
                                            <>
                                                {Object.keys(d.value).map((user) => {
                                                    return (
                                                        <Contact key={user} uid={user} search={search} />
                                                    )
                                                })}
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
                        </div>
                    </div>)

            }
        </MediaQuery>
    )
}