import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const signIn = () => {
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

    return (
        <div>
            <h2>Sign In Page</h2>
            <button onClick={signIn}>Sign In with Google</button>
        </div>
    )
}

export default SignIn