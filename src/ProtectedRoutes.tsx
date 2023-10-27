import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoutes = () => {

    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                console.log("User is authenticated:", firebaseUser);
                setIsAuthed(true);
            } else {
                console.log("User is not authenticated.");
                setIsAuthed(false);
            }
        });
    }, []);

    return isAuthed === null ? <div>Loading...</div> : isAuthed ? <Outlet/> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
