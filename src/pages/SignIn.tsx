import { onAuthStateChanged, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { textInputStyle } from "../GlobalStyles";
import GhostButton from "../components/GhostButton";
import GoogleAuthButton from "../components/GoogleAuthButton";
import PrimaryButton from "../components/PrimaryButton";

function SignIn() {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const userId = user?.uid;
            console.log("User ID: ", userId);
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
        <div className="w-full mx-auto flex flex-col gap-6 text-center items-center">
            <h1 className="font-semibold text-xl">Sign In</h1>
            <GoogleAuthButton/> 
            <p>or</p>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={textInputStyle} placeholder="example@mail.com" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={textInputStyle} placeholder="********" />
                </div>
                <PrimaryButton buttonText="Sign In" onClick={emailSignIn} />
            </div>
            <p className="text-slate-500 mt-4">Don't have an account yet? <a href="/register" className="text-black font-semibold">Create account</a></p>
        </div>
    )
}

export default SignIn