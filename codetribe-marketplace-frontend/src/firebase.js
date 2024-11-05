// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUCeJp7na3_l1HsE1HsUJVDp1hKFogpZg",
  authDomain: "codetribe-technical.firebaseapp.com",
  projectId: "codetribe-technical",
  storageBucket: "codetribe-technical.appspot.com",
  messagingSenderId: "908742084848",
  appId: "1:908742084848:web:b52832998e64a3b1b21a35",
  measurementId: "G-LEHFZE06J4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Storage

// Export the initialized services
export { app, db, auth, storage }; // Ensure storage is included in exports
