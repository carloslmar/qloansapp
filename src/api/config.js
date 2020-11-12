import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcL-gIaboXeW-L5_lr1UC-aaE-W-yc2Fs",
  authDomain: "ql-mobile-app-3a52a.firebaseapp.com",
  databaseURL: "https://ql-mobile-app-3a52a.firebaseio.com",
  projectId: "ql-mobile-app-3a52a",
  storageBucket: "ql-mobile-app-3a52a.appspot.com",
  messagingSenderId: "107911682387",
  appId: "1:107911682387:web:d4019a13756730c57fa9a6",
  measurementId: "G-WVZ477NF5P",
};

firebase.initializeApp(firebaseConfig);
export default firebaseConfig;
