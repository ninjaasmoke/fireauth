'use client';

import Head from 'next/head';
import styles from './page.module.css';

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, User, browserLocalPersistence, getAuth, setPersistence, signInWithPopup, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {

  const signInWithGooglePopup = async (): Promise<User | string> => {
    try {
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return "Login Failed";
    }
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>Hello World</title>
      </Head>
      <h1>Hello there.</h1>

      <button onClick={signInWithGooglePopup}>Sign in with popup</button>
    </main>
  )
}
