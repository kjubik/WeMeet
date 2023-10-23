import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Regitser() {

    const navigate = useNavigate();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log('Token:', credential?.accessToken, 'User:', result?.user);
            navigate('/profile');
        }).catch((error) => {
            console.log("Failed to sign in: ", error);
        });
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const emailRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Account created: ", userCredential.user)
            navigate('/profile');
          })
          .catch((error) => {
            console.log("Failed to create account: ", error);
          });
    }

    return (
        <div className="m-2 flex flex-col items-start gap-4">
            <h1 className="font-semibold text-xl">Create account</h1>
            <button onClick={signInWithGoogle} className="text-white bg-blue-500 font-semibold rounded px-3 py-2">Sign In with Google</button>
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="outline outline-1 outline-slate-500 rounded px-2 py-1" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="outline outline-1 outline-slate-500 rounded px-2 py-1" />
                <button type="button" onClick={emailRegister} className="text-blue-500 font-semibold">Create account</button>
            </div>
            <p className="text-slate-500">Already have an account? <a href="/signin" className="text-blue-500 font-semibold">Sign In</a></p>
        </div>
    )
}

export default Regitser