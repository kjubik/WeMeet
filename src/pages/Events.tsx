import { getAuth } from "@firebase/auth";
import { Event } from "../firebase/types";
import { useEffect, useState } from "react";
import { createEvent, getUserEvents } from "../firebase/firestore";
import { buttonPrimaryStyle, textInputStyle } from "../GlobalStyles";

function Events() {

    const auth = getAuth();
    const [title, setTitle] = useState("Your event");
    const [userEvents, setUserEvents] = useState<Event[]>([]); // State to store user's events

    useEffect(() => {
        if (auth.currentUser) {
            getUserEvents(auth.currentUser.uid).then((events) => {
              setUserEvents(events);
            });
          }
    }, [auth.currentUser]);

    const handleCreateEvent = () => {
        createEvent(eventData, auth.currentUser?.uid)
        .then(() => {
            if (auth.currentUser) {
                getUserEvents(auth.currentUser.uid).then((events) => {
                  setUserEvents(events);
                });
              }
        })
        .catch((error) => {
            console.error("Error handling create event:", error);
          });
    }

    const eventData: Omit<Event, 'id'> = {
        title: title,
        organizer: auth.currentUser?.uid,
        participants: [auth.currentUser?.uid],
    }

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {userEvents.map((event) => (
                    <li key={event.id}>{event.title}</li>
                ))}
            </ul>
            <h2>Create new event</h2>
            <label htmlFor="title">Title</label><br/>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={textInputStyle}/><br/>
            <button onClick={handleCreateEvent} className={buttonPrimaryStyle}>Create new event</button>
        </div>
    );
}

export default Events;
