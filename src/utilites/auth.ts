import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();
const navigate = useNavigate();
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

export { signInWithGoogle }