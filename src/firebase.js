import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "sugbo-eats.firebaseapp.com",
    projectId: "sugbo-eats",
    storageBucket: "sugbo-eats.appspot.com",
    messagingSenderId: "184395993549",
    appId: "1:184395993549:web:25a850839cab37bc147484",
    measurementId: "G-2TWXGQZXPV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Google Authentication Provider
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, db };