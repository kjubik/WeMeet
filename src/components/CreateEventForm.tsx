import { useState } from "react";
import { Event } from "../firebase/types";
import { getAuth } from "firebase/auth";
import { createEvent, inviteToEvent } from "../firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { where, query, collection, QuerySnapshot, getDocs } from "firebase/firestore";
import SecondaryButton from "./SecondaryButton";

function CreateEventForm() {

    const auth = getAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [userQuery, setUserQuery] = useState("");
    const [invitees, setInvitees] = useState<string[]>([]);

    const eventData: Omit<Event, "id"> = {
        title,
        description,
        date,
        time,
        organizer: auth.currentUser?.uid,
        participants: [auth.currentUser?.uid],
        invitees,
    }

    const handleAddEvent = async () => {
        await createEvent(eventData, auth.currentUser?.uid);
        location.reload();
    }

    const handleInviteUser = async () => {
        try {
            const q = query(collection(db, "users"), where("email", "==", userQuery))
            const querySnapshot: QuerySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("No user found");
                return;
            }
        } catch (error) {
            console.error("Error checking if user with email exists:", error)
            return;
        }

        setInvitees(invitees => [...invitees, userQuery]) // this should be the ID of the invited user, not the query
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
                <div className="w-full flex gap-4">
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} 
                    className="w-full"/>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} 
                    className="w-full"/>
                </div>
                <div className="w-full flex gap-4 items-center">
                    <input type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} 
                    className="outline outline-1 outline-slate-500 rounded px-2 py-1 mb-2 w-full" />
                    <SecondaryButton buttonText="Invite" onClick={handleInviteUser} />
                </div>
                {invitees}
            </div>
            <button onClick={handleAddEvent}
            className="bg-black rounded-full text-white font-semibold py-2 text-md">
                Create event
            </button>
        </div>
    );
}

export default CreateEventForm;
