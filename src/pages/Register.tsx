import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { User } from "../firebase/types";
import { buttonPrimaryStyle, textInputStyle, buttonGhostStyle } from "../GlobalStyles";
import PrimaryButton from "../components/PrimaryButton";

function Regitser() {

    const navigate = useNavigate();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                console.log("User already exists in Firestore.");
            } else {
                const newUser : User = {
                    id: auth.currentUser.uid,
                    email: auth.currentUser.email || '',
                    name: auth.currentUser.displayName || '',
                }
                await createUser(newUser);
                console.log("User created in Firestore.");
            }
            navigate('/profile');
            } else {
            console.error("User is not authenticated or has no UID.");
            }
        } catch (error) {
            console.error("Failed to sign in: ", error);
        }
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const emailRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Account created: ", userCredential.user)
            createUser({id: auth.currentUser?.uid || '', email: auth.currentUser?.email || '', name: ''})
            navigate('/profile');
          })
          .catch((error) => {
            console.log("Failed to create account: ", error);
          });
    }

    return (
        <div className="m-2 flex flex-col items-start gap-4">
            <h1 className="font-semibold text-xl">Create account</h1>
            <PrimaryButton buttonText="Sign In with Google" onClick={signInWithGoogle} />
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={textInputStyle} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={textInputStyle} />
                <button type="button" onClick={emailRegister} className={buttonGhostStyle}>Create account</button>
            </div>
            <p className="text-slate-500">Already have an account? <a href="/signin" className="text-blue-500 font-semibold">Sign In</a></p>
        </div>
    )
}

export default Regitser