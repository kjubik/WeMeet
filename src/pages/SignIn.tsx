import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../utilites/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Signed in: ", userCredential.user)
            navigate('/dashboard');
          })
          .catch((error) => {
            console.log("Failed to sign in: ", error);
          });
    }
    
    return (
        <div className="m-2 flex flex-col items-start gap-4">
            <h1 className="font-semibold text-xl">Sign In to WeMeet</h1>
            <button onClick={signInWithGoogle} className="text-blue-500 font-semibold">Sign In with Google</button>
            <form onSubmit={emailSignIn} className="flex flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="text-blue-500 font-semibold">Sign In</button>
            </form>
            <p>Don't have an account yet? <a href="/register" className="text-blue-500 font-semibold">Create account</a></p>
        </div>
    )
}

export default SignIn