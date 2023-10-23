import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase.ts";
import SignIn from "./pages/SignIn.tsx";

function App() {
  console.log(auth);
  console.log(db);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
