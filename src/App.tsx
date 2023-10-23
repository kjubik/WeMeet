import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
