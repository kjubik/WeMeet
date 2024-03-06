// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALZ7-2HyK7RGe3jnQG_9mRBksw-meRyPM",
  authDomain: "wemeet-calendar.firebaseapp.com",
  projectId: "wemeet-calendar",
  storageBucket: "wemeet-calendar.appspot.com",
  messagingSenderId: "967912408708",
  appId: "1:967912408708:web:f10952d5a60d285c1be4d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
