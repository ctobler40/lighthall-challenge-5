// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnXtIi8lKlwW6NX7PXw2NXTKlmGUtnjpI",
  authDomain: "lyricfinder-fb70c.firebaseapp.com",
  projectId: "lyricfinder-fb70c",
  storageBucket: "lyricfinder-fb70c.appspot.com",
  messagingSenderId: "366078283137",
  appId: "1:366078283137:web:e0edca0844419e6a23ac80",
  measurementId: "G-SSZT8W1M7Y"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };