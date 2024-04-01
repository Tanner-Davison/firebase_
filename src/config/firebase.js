// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAFQdZnN2eJY0jh4J61YR7_Ar9EYG3aLOM",
  authDomain: "fir-project-4e81e.firebaseapp.com",
  projectId: "fir-project-4e81e",
  storageBucket: "fir-project-4e81e.appspot.com",
  messagingSenderId: "957291773154",
  appId: "1:957291773154:web:770cb4e98203bd268c32bb",
  measurementId: "G-2JHWSCZJ42"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
