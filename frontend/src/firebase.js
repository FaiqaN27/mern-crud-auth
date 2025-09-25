// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-crud.firebaseapp.com",
  projectId: "mern-auth-crud",
  storageBucket: "mern-auth-crud.firebasestorage.app",
  messagingSenderId: "758840780447",
  appId: "1:758840780447:web:3b2e9467dcdafe2878e4aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);