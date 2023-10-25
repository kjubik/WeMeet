import { getAuth, signOut } from "@firebase/auth";
import AuthObserver from '../firebase/authObserver.tsx';

function Profile() {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                window.location.reload(); // Reload the page after successful sign out
            })
            .catch((error) => {
                console.log("Error signing out:", error);
            });
    };

    return (
        <div>
            <h1>My profile</h1>
            <AuthObserver>
                {(user: any) => {
            if (user) {
                return <p>Welcome, {user.displayName}!</p>;
            } else {
                return <p>Please sign in.</p>;
            }
            }}
            </AuthObserver>
        </div>
    );
};

export default Profile;
