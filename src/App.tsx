import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase.ts";

function App() {
  console.log(auth);
  console.log(db);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
