import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDocToCollection, doesDocumentWithIdExist } from '../Database/firestoreUtils';

const SignInWithGoogleButton = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      console.log(auth.currentUser?.uid)
      if (auth.currentUser) {
        const userExists = await doesDocumentWithIdExist('users', auth.currentUser.uid);
        if (userExists) {
          navigate('/profile');
        } else {
          navigate('/welcome');
          await addDocToCollection('users', auth.currentUser.uid, { name: "Joe", email: 'example@mail.com'} );
        }
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className='border-2 border-black px-2 py-1'>
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
