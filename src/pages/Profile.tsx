import { getAuth, signOut } from "@firebase/auth";

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
            {currentUser ? (
                <div>
                    <p>Logged in as: {currentUser.email}</p>
                    <button onClick={handleLogout} className="text-white bg-blue-500 font-semibold rounded px-2 py-1 mt-2">Log out</button>
                </div>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};

export default Profile;
