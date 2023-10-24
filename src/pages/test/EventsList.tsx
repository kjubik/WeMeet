import { useEffect, useState } from "react";
import { getEvents } from "../../firebase/firestore";
import { Event } from "../../firebase/types";

function EventsList() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
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
