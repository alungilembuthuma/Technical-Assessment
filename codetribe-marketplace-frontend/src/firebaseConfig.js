import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "ab8585971b0ae138ae5835a8e312992e1afc834d",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
