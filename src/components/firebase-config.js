import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "keeper-app-ac291.firebaseapp.com",
    projectId: "keeper-app-ac291",
    storageBucket: "keeper-app-ac291.appspot.com",
    messagingSenderId: "42140009293",
    appId: process.env.APP_ID,
    measurementId: "G-0N1BLQYHMS"
};

// Connecting to firebase
const app = initializeApp(firebaseConfig);
// Connecting to firestore
export const db = getFirestore(app)
// Also we need to use this db varibale outside this file, so we need to export it
