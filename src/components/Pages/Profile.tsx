import { createMeeting } from "../Database/firestoreUtils";

function Profile() {
    return (
        <div>
            <h1 className="font-bold">Profile Page</h1>
            <button onClick={() => createMeeting({ name: "A party", owner: 'user/userID', members: ['users/userID']})} className="border-2 border-black px-2 py-1">Create a meeting</button>
        </div>
    );
}

export default Profile;