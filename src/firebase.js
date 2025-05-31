// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6cpOtuobK2TCJWFbKyNfKA59pWqVfwPM",
    authDomain: "swanik-a538d.firebaseapp.com",
    projectId: "swanik-a538d",
    storageBucket: "swanik-a538d.firebasestorage.app",
    messagingSenderId: "457853120108",
    appId: "1:457853120108:web:d70caa56288658d664b249"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
