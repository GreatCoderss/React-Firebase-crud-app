import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAYdCMaSy0SzGi9USBmnoQZQugMtKvANwE",
  authDomain: "reactmuicrudapp.firebaseapp.com",
  projectId: "reactmuicrudapp",
  storageBucket: "reactmuicrudapp.appspot.com",
  messagingSenderId: "617811882732",
  appId: "1:617811882732:web:40e752b902ef515107abc9",
  measurementId: "G-WR6ZHGHN8L",
};
// Initialize Firebase
const FirebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default FirebaseApp;
export { db };
