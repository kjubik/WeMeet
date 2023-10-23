import { getAuth } from "@firebase/auth";


function Profile() {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    return (
        <div>
            <h1>My profile</h1>
            {currentUser ? (
                <p>Logged in as: {currentUser.email}</p>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};

export default Profile;
