import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../utilites/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Regitser() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();
    const navigate = useNavigate();

    const emailRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Account created: ", userCredential.user)
            navigate('/dashboard');
          })
          .catch((error) => {
            console.log("Failed to create account: ", error);
          });
    }

    return (
        <div className="m-2 flex flex-col items-start gap-4">
            <h1 className="font-semibold text-xl">Create account on WeMeet</h1>
            <button onClick={signInWithGoogle} className="text-blue-500 font-semibold">Register with Google</button>
            <form onSubmit={emailRegister} className="flex flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="text-blue-500 font-semibold">Sign In</button>
            </form>
            <p>Already have an account? <a href="/signin" className="text-blue-500 font-semibold">Sign In</a></p>
        </div>
    )
}

export default Regitser