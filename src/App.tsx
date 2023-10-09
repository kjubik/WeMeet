
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Navbar from './components/Layouts/Navbar';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDr3WFxCxZQKms1Jy-hGjW2x6B7oPiDNAw",
    authDomain: "wemeet-fd684.firebaseapp.com",
    projectId: "wemeet-fd684",
    storageBucket: "wemeet-fd684.appspot.com",
    messagingSenderId: "105785457128",
    appId: "1:105785457128:web:1027db414ae82d6e430c5d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/profile" Component={Profile}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
