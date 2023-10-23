import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase.ts";
import SignIn from "./pages/SignIn.tsx";
import Regitser from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  console.log(auth);
  console.log(db);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><a href="/signin">Sign In</a><br/><a href="/register">Create account</a></div>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/register" element={<Regitser/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
