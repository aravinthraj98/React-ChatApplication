// Import the functions you need from the SDKs you need
import React from "react"
import firebase from "firebase/compat"

// import  firebase from "firebase/compat/app";
// import "firebase/app"
// import "firebase/storage"
// import "firebase/app"
// r;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTwTOWPDTyoIPLiy-Faol-GPfxuxNr4mE",
  authDomain: "chatapplication-d9c1e.firebaseapp.com",
  projectId: "chatapplication-d9c1e",
  storageBucket: "chatapplication-d9c1e.appspot.com",
  messagingSenderId: "178713648418",
  appId: "1:178713648418:web:f415aca74420278486d97b",
  measurementId: "G-QJGVY6TQHJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();





export {auth, firebase as default };
