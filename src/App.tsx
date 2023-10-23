import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDr3WFxCxZQKms1Jy-hGjW2x6B7oPiDNAw",
    authDomain: "wemeet-fd684.firebaseapp.com",
    projectId: "wemeet-fd684",
    storageBucket: "wemeet-fd684.appspot.com",
    messagingSenderId: "105785457128",
    appId: "1:105785457128:web:1027db414ae82d6e430c5d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  return (
    <h1>wemeet</h1>
  )
}

export default App
