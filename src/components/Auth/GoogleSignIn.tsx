import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignInWithGoogleButton = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
