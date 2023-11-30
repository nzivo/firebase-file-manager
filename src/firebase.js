// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASBkUGc56QqobAH2BTvh50lm8eJiO3SyA",
  authDomain: "fir-file-manager-5a541.firebaseapp.com",
  projectId: "fir-file-manager-5a541",
  storageBucket: "fir-file-manager-5a541.appspot.com",
  messagingSenderId: "973293642945",
  appId: "1:973293642945:web:3f5a4aa582fb11bc69e040",
  measurementId: "G-4R52GY8H2E",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, firebaseApp as default };
