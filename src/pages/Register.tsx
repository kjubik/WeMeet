import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../firebase/firestore";
import { textInputStyle } from "../GlobalStyles";
import GoogleAuthButton from "../components/GoogleAuthButton";
import PrimaryButton from "../components/PrimaryButton";

function Regitser() {

    const navigate = useNavigate();

    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const emailRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Account created: ", userCredential.user)
            createUser({id: auth.currentUser?.uid || '', username: '', name: '', email: auth.currentUser?.email || '', events: []})
            navigate('/profile');
          })
          .catch((error) => {
            console.log("Failed to create account: ", error);
          });
    }

    return (
        <div className="w-full mx-auto flex flex-col gap-6 text-center items-center">
            <h1 className="font-semibold text-xl">Create account</h1>
            <GoogleAuthButton/>
            <p>or</p>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={textInputStyle} placeholder="example@mail.com" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={textInputStyle} placeholder="********" />
                </div>
                <PrimaryButton buttonText="Create account" onClick={emailRegister} />
            </div>
            <p className="text-slate-500">Already have an account? <a href="/signin" className="text-black font-semibold">Sign In</a></p>
        </div>
    )
}

export default Regitser