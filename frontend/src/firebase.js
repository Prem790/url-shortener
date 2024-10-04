// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcTtPbMmDbtxXsbfqvZZ3rAhlKBiZT-ec",
  authDomain: "url-shortener-c1e2c.firebaseapp.com",
  projectId: "url-shortener-c1e2c",
  storageBucket: "url-shortener-c1e2c.appspot.com",
  messagingSenderId: "572019118759",
  appId: "1:572019118759:web:7ff4b19e6a4d7d44394182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);
export { db };
