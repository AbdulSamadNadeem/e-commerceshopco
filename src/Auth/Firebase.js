import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup ,signInWithEmailAndPassword ,onAuthStateChanged ,signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBGh2yH-sLssUafgoyrrvKgECTyKnpIaE0",
  authDomain: "e-commerce-4dc8b.firebaseapp.com",
  projectId: "e-commerce-4dc8b",
  storageBucket: "e-commerce-4dc8b.firebasestorage.app",
  messagingSenderId: "917844314585",
  appId: "1:917844314585:web:c27fe2d3b4a9660bf931c8",
  measurementId: "G-0XDWQJ3MMS"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();


export{auth , createUserWithEmailAndPassword , GoogleAuthProvider , signInWithPopup , provider ,signInWithEmailAndPassword ,onAuthStateChanged ,signOut }
