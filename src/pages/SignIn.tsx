import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {

    const navigate = useNavigate();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log('Token:', credential?.accessToken, 'User:', result?.user);
            navigate('/dashboard');
        }).catch((error) => {
            console.log("Failed to sign in: ", error);
        });
    }

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
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={emailSignIn} className="text-blue-500 font-semibold">Sign In</button>
            </div>
            <p>Don't have an account yet? <a href="/register" className="text-blue-500 font-semibold">Create account</a></p>
        </div>
    )
}

export default SignIn