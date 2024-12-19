import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR5TOyEqeANrQEiaCdOsoRILcrZj1sHMo",
  authDomain: "crwn-clothing-7dd1c.firebaseapp.com",
  projectId: "crwn-clothing-7dd1c",
  storageBucket: "crwn-clothing-7dd1c.firebasestorage.app",
  messagingSenderId: "943883549026",
  appId: "1:943883549026:web:37416322f838eabed1943b",
  measurementId: "G-VVBZ376ZLL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Sign-In
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// Signing In with Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", "userAuth.uid");
  const userSnapshot = await getDoc(userDocRef);

  // If user data does not exist
  // create / set the UserDoc with the Data from userAuth in my db

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // Check if user data Exists && Return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
