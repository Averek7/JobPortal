// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2Wu95G93THis1ey0cyuU_RVbnHO3o9QI",
  authDomain: "jobportal-f88f0.firebaseapp.com",
  projectId: "jobportal-f88f0",
  storageBucket: "jobportal-f88f0.appspot.com",
  messagingSenderId: "454373454458",
  appId: "1:454373454458:web:9a9b85b88ea617e127c1c3",
  measurementId: "G-3XW6R8TR8L",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
export default firebaseApp;
