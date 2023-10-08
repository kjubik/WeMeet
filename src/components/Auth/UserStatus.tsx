import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import GoogleSignIn from './GoogleSignIn.tsx'
import LogOut from './LogOut.tsx'

const UserStatus: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>User is logged in as:</p>
          <p>{user.email}</p>
          <LogOut />
        </div>
      ) : (
        <GoogleSignIn />
      )}
    </div>
  );
};

export default UserStatus;
