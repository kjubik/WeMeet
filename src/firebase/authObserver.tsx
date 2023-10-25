// AuthObserver.js
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AuthObserver({ children: children }: { children: any }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return children(user);
}

export default AuthObserver;
