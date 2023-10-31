import { onAuthStateChanged, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { textInputStyle } from "../GlobalStyles";
import GhostButton from "../components/GhostButton";
import GoogleAuthButton from "../components/GoogleAuthButton";

function SignIn() {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const userId = user?.uid;
            console.log("User ID: ", userId);
            if (userId) {
                navigate('/profile');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const auth = getAuth();

    const emailSignIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
                console.log("Signed in: ", userCredential.user)
                navigate('/profile');
            })
            .catch((error) => {
                console.log("Failed to sign in: ", error);
            });
    }
    
    return (
        <div className="m-2 flex flex-col items-start gap-4">
            <h1 className="font-semibold text-xl">Sign In</h1>
            <GoogleAuthButton/>
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={textInputStyle} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={textInputStyle} />
                <GhostButton buttonText="Sign In" onClick={emailSignIn} />
            </div>
            <p className="text-slate-500">Don't have an account yet? <a href="/register" className="text-blue-500 font-semibold">Create account</a></p>
        </div>
    )
}

export default SignIn