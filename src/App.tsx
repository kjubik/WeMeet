import GoogleSignIn from './components/Auth/GoogleSignIn'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr3WFxCxZQKms1Jy-hGjW2x6B7oPiDNAw",
    authDomain: "wemeet-fd684.firebaseapp.com",
    projectId: "wemeet-fd684",
    storageBucket: "wemeet-fd684.appspot.com",
    messagingSenderId: "105785457128",
    appId: "1:105785457128:web:1027db414ae82d6e430c5d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <h1>WeMeet</h1>
      <GoogleSignIn />
    </div>
  )
}

export default App
