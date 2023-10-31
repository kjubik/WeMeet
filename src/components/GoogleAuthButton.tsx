import { getAuth } from "@firebase/auth";
import PrimaryButton from "./PrimaryButton";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { createUser } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User } from "../firebase/types";


function GoogleAuthButton() {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const authWithGoogle = async () => {
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
                    username: auth.currentUser.displayName || '',
                    events: [],
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

    return (
        <PrimaryButton onClick={authWithGoogle} buttonText="Continue with Google" />
    )
}

export default GoogleAuthButton;
