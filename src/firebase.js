// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvBeQXgl52tavWB33DF-GEZpGCCUEQS0g",
  authDomain: "file-manager-13c00.firebaseapp.com",
  projectId: "file-manager-13c00",
  storageBucket: "file-manager-13c00.appspot.com",
  messagingSenderId: "259503408818",
  appId: "1:259503408818:web:1c72dfdbbba64804276bab",
  measurementId: "G-HGE3B6BMMN",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, firebaseApp as default };
