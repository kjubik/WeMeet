import { useState } from "react";
import { Event } from "../firebase/types";
import { getAuth } from "firebase/auth";
import { createEvent } from "../firebase/firestore";
import InviteUsers from "./InviteUsers";

function CreateEventForm() {

    const auth = getAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [invitees, setInvitees] = useState<string[]>([]);

    const eventData: Omit<Event, "id"> = {
        isDeleted: false,
        title,
        description,
        date: "12-05-2003",
        time: "21:37",
        organizer: auth.currentUser?.uid,
        participants: [auth.currentUser?.uid],
        invitees,
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
            </div>
            <InviteUsers participants={eventData.participants} invitees={invitees} setInvitees={setInvitees} />
            <button onClick={handleAddEvent}
            className="bg-black rounded-full text-white font-semibold py-2 text-md">
                Create event
            </button>
        </div>
    );
}

export default CreateEventForm;
