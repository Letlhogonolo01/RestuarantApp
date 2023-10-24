//  firebase config key setup
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnHpzcimXD-kvOgxe7zKTZMkGSJo3PpVM",
  authDomain: "reservations-77a98.firebaseapp.com",
  projectId: "reservations-77a98",
  storageBucket: "reservations-77a98.appspot.com",
  messagingSenderId: "198051476653",
  appId: "1:198051476653:web:554f344b39738078724224",
  measurementId: "G-9ZKMCBBMNR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { firebase, db };
