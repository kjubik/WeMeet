import { useState } from 'react';
import { searchUserByUsername } from '../firebase/firestore';

interface Props {
    participants: (string | undefined)[],   // array of user ids
    invitees: string[],       // array of user ids
    setInvitees: (invitees: string[]) => void
}

function InviteUsers({participants, invitees, setInvitees}: Props) {

    const  [query, setQuery] = useState('');    // query is a username

    const handleInviteClicked = async () => {
        const userId = await searchUserByUsername(query);

        if (userId === null) {
            alert("User not found");
            return;
        }

        if (participants.includes(userId)) {
            alert("User is already a participant");
            return;
        }

        console.log("checking if user invited");

        if (invitees.includes(userId)) {
            alert("User is already invited");
            return;
        }

        setInvitees([...invitees, userId]);
        alert("User invited");
    }

    return (
        <div>
            <div className='flex gap-2'>
                <input type="text" placeholder='Search for user' value={query} onChange={(e) => setQuery(e.target.value)} 
                className='w-full'/>
                <button onClick={handleInviteClicked}>Invite</button>
            </div>
        </div>
    )
}

export default InviteUsers;
