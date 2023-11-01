import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase/firebaseConfig.ts";
import SignIn from "./pages/SignIn.tsx";
import Regitser from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import ReleaseNotes from "./pages/ReleaseNotes.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Events from "./pages/Events.tsx";

function App() {
  console.log(auth);
  console.log(db);
  return (
    <div>
        <nav>
          <ul className="p-2 bg-slate-200 flex gap-4">
            <li><a href="/">Home</a></li>
            <li><a href="/signin">Sign In</a></li>
            <li><a href="/register">Create Account</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a className="font-bold" href="/events">Events</a></li>
            <li><a href="release-notes">Release Notes</a></li>
          </ul>
        </nav>
        <main className="p-4">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div><h1>Welcome to WeMeet!</h1></div>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/register" element={<Regitser/>} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/events" element={<Events/>}/>
            </Route>
            <Route path="release-notes" element={<ReleaseNotes/>}/>
          </Routes>
        </BrowserRouter>
        </main>
    </div>
  )
}

export default App
