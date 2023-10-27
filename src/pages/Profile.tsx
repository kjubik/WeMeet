import { getAuth, signOut } from "@firebase/auth";
import { createEvent } from "../firebase/firestore";
import { Event } from "../firebase/types";
import { useState } from "react";

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

    const [title, setTitle] = useState("Your event");

    const eventData: Omit<Event, 'id'> = {
        title: title,
        organizer: auth.currentUser?.uid,
        participants: [auth.currentUser?.uid],
    }

    return (
        <div>
            <p>Linked email: {auth.currentUser?.email}</p>
            <button onClick={handleLogout}>Sign out</button><br/>
            <label htmlFor="title">Title</label><br/>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="outline outline-1 outline-slate-500 rounded px-2 py-1 mb-2"/><br/>
            <button onClick={() => createEvent(eventData, auth.currentUser?.uid)} className="text-white bg-blue-500 font-semibold rounded px-3 py-2">Create new event</button>
        </div>
    );
};

export default Profile;
