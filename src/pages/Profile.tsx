import { getAuth, signOut } from "@firebase/auth";

function Profile() {

    const auth = getAuth();

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
            <p>Linked email: {auth.currentUser?.email}</p>
            <button onClick={handleLogout}>Sign out</button>
        </div>
    );
};

export default Profile;
