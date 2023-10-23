import { getAuth } from "@firebase/auth";


function Profile() {

    const auth = getAuth();

    return (
        <div>
            <h1>Profile</h1>
            <p>Logged in as: {auth.currentUser?.email}</p>
        </div>
    );
};

export default Profile;
