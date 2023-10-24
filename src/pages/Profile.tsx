import { getAuth } from "@firebase/auth";
import { getEvents } from "../firebase/firestore";
import { useEffect, useState } from "react";
import { Event } from "../firebase/types";

function Profile() {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events);
        });
    }, []);

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
