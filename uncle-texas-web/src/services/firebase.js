// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD6Po0jxTFT_T34aMJBIYrAIWvwFTWnj6g",
  authDomain: "uncle-texas-web.firebaseapp.com",
  projectId: "uncle-texas-web",
  storageBucket: "uncle-texas-web.firebasestorage.app",
  messagingSenderId: "711919531302",
  appId: "1:711919531302:web:c325ac95dae60071e7fde7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
