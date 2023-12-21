// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {getMessaging, getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(firebaseApp);


const addNotification = async (userId, jobId, message) => {
  try {
    const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, {
      userId,
      jobId,
      message,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding notification to Firestore:', error.message);
  }
};

export { addNotification };


export { auth, db, provider, messaging };

export default firebaseApp;
