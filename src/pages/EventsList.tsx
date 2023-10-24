import { useEffect, useState } from "react"; // 1. Import React hooks
import { getEvents } from "../firebase/firestore"; // 2. Import getEvents function
import { Event } from "../firebase/types";

function EventsList() {
    const [events, setEvents] = useState<Event[]>([]); // 3. Initialize events state

    useEffect(() => {
        // 4. Fetch and set events when the component mounts
        const fetchEvents = async () => {
            try {
                setEvents(await getEvents());
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            {events.map((event) => (
                <div key={event.id}>
                    <h2 className="font-bold">{event.title}</h2>
                    <p>organized by <span className="italic">{event.organizer}</span></p>
                </div>
            ))}
        </div>
    );
}

export default EventsList;
