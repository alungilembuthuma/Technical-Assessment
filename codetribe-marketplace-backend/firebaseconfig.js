// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUCeJp7na3_l1HsE1HsUJVDp1hKFogpZg",
  authDomain: "codetribe-technical.firebaseapp.com",
  projectId: "codetribe-technical",
  storageBucket: "codetribe-technical.firebasestorage.app",
  messagingSenderId: "908742084848",
  appId: "1:908742084848:web:b52832998e64a3b1b21a35",
  measurementId: "G-LEHFZE06J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);