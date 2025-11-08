
'use client';
// Firebase configuration for Firestore only (Auth removed for open access)
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_3pSSn6f4x531b2NqM5T85rF63g8cY2U",
  authDomain: "pinealvision.firebaseapp.com",
  projectId: "pinealvision",
  storageBucket: "pinealvision.appspot.com",
  messagingSenderId: "590588534644",
  appId: "1:590588534644:web:3b4d95c8aa84c355ba9621"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// NOTE: Firebase Auth and AppCheck have been removed to allow open access to all visitors
// All authentication requirements have been stripped from the application

const getDbInstance = (): Firestore => {
    return getFirestore(app);
}

export { app, getDbInstance as db };
