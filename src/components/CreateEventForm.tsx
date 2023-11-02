import { useState } from "react";
import { Event } from "../firebase/types";
import { getAuth } from "firebase/auth";
import { createEvent } from "../firebase/firestore";

function CreateEventForm() {

    const auth = getAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const eventData: Omit<Event, "id"> = {
        title,
        description,
        date,
        time,
        organizer: auth.currentUser?.uid,
        participants: [auth.currentUser?.uid],
    }

    const handleAddEvent = async () => {
        await createEvent(eventData, auth.currentUser?.uid);
        location.reload();
    }

    return (
        <div className="max-w-sm flex flex-col gap-8">
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row-reverse">
                    <button className="font-semibold text-neutral-400">Close</button>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-2xl font-semibold outline-none" placeholder="Event title"/>
                </div>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full text-md font-normal outline-none" placeholder="Add a description" />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button onClick={handleAddEvent}
            className="bg-black rounded-full text-white font-semibold py-2 text-md">
                Create event
            </button>
        </div>
    );
}

export default CreateEventForm;
