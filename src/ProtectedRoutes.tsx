import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {     // This is a fake auth check. Will replace this with Firebase's auth check.
    const user = {loggedIn: true};
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const isAuthed = useAuth();
    return isAuthed ? <Outlet/> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;