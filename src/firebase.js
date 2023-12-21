// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC07BRYo-97M0yIv-e5AX9bR-I2Gyn0xR0",
  authDomain: "jobportal-6b179.firebaseapp.com",
  projectId: "jobportal-6b179",
  storageBucket: "jobportal-6b179.appspot.com",
  messagingSenderId: "595588535128",
  appId: "1:595588535128:web:0496c325e2823e43650b2d",
  measurementId: "G-1XR6QBCPXJ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); 
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


export { auth, db, provider }; 
