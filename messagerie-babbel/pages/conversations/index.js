import Head from 'next/head'

import { useAuth } from '../../lib/auth';

import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Users from '../../components/Users';
import Conversation from '../../components/Conversation';
import InputLanguage from '../../components/InputLanguage';

import { ConversationProvider } from '../../context/Conversation';

import { useMediaQuery } from 'react-responsive';

import styles from '../../styles/Conversation.module.css'

export default function Home() {

    const router = useRouter()

    const { user, signout, setUserLanguage } = useAuth();

    const isMobile = useMediaQuery({
        query: '(max-device-width: 800px)'
    })

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user])

    return (
        <ConversationProvider>
            <div className={isMobile ? styles.containerMobile : styles.container}
            >
                <Head>
                    <title>Messagerie babbel</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/babel.ico" />
                </Head>

                <main className={styles.main}
                >
                    <div className={styles.horizontal}>
                        <div>
                            <InputLanguage Value={user?.languageCode} setValue={setUserLanguage} />
                        </div>
                        {isMobile ? <Users /> : <></>}
                        <div>
                            <button onClick={signout}>
                                signe out
                            </button>
                        </div>
                    </div>
                    <div className={isMobile ? styles.mainBodyMobile : styles.mainBody}>
                        {isMobile ? <></> : <Users />}
                        <Conversation />
                    </div>
                </main>
            </div>
        </ConversationProvider>
    )
}