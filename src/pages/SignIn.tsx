import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const signIn = () => {  
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            navigate("/dashboard");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    console.log(auth);
    return (
        <div>
            <h2>Sign In</h2>
            <button onClick={signIn}>Sign In with Google</button>
        </div>
    )
}

export default SignIn