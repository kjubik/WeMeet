import { getAuth } from "@firebase/auth";
import { Event } from "../firebase/types";
import { useEffect, useState } from "react";
import { getUserEvents } from "../firebase/firestore";
import CreateEventForm from "../components/CreateEventForm";
import EventPreviewCard from "../components/EventPreviewCard";

function Events() {

    const auth = getAuth();
    const [userEvents, setUserEvents] = useState<Event[]>([]); // State to store user's events

    useEffect(() => {
        if (auth.currentUser) {
            getUserEvents(auth.currentUser.uid).then((events) => {
              setUserEvents(events);
            });
          }
    }, [auth.currentUser]);

    return (
        <div className="w-full mx-auto max-w-xl flex flex-col gap-4">
            <CreateEventForm />
            <h1 className="font-bold text-4xl mt-12">My Events</h1>
            <ul className="flex flex-col gap-12 mt-6 mb-12">
                {userEvents.map((event) => (
                    <EventPreviewCard key={event.id} event={event} />
                ))}
            </ul>
        </div>
    );
}

export default Events;
