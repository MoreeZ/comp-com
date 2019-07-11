import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBE9_G5P3UNqRplWrPhNadvXVF1fYpBn2U",
  authDomain: "comp-com.firebaseapp.com",
  databaseURL: "https://comp-com.firebaseio.com",
  projectId: "comp-com",
  storageBucket: "comp-com.appspot.com",
  messagingSenderId: "176967012033"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
//make auth and firesotre services

// const auth = firebase.auth();
// const db = firebase.firestore;

export default firebase;
