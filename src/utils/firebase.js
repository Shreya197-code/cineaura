// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqDhW852LuoPQfuIKSbUCGASbI8ZWVR60",
  authDomain: "cineaura-14599.firebaseapp.com",
  projectId: "cineaura-14599",
  storageBucket: "cineaura-14599.firebasestorage.app",
  messagingSenderId: "985366507753",
  appId: "1:985366507753:web:f541dba92249dc5b230078",
  measurementId: "G-TFLETD1HTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


 export const auth = getAuth(app);