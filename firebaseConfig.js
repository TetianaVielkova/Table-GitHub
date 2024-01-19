import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDAI80jsZUSHdi0GonEMRuWxp8s8F0y5Ww",
    authDomain: "table-auth-github.firebaseapp.com",
    projectId: "table-auth-github",
    storageBucket: "table-auth-github.appspot.com",
    messagingSenderId: "72481547279",
    appId: "1:72481547279:web:5160572fd63d7b24726f7a"
};

const app =  initializeApp(firebaseConfig);
const auth = getAuth();

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const createUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPasswordFirebase(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };
  
  export { app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };

