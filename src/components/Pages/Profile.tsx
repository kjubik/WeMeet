import React, { FC, useState } from 'react';
import { Meeting, Timeframe } from "../Database/firestoreTypes";
import { createMeeting } from "../Database/firestoreUtils";
import { Timestamp } from 'firebase/firestore';
import { auth } from '../../App';

function Profile() {
    const currentDate = new Date();
    const firestoreTimestamp = Timestamp.fromDate(currentDate);

    // Ensure you handle the case where auth.currentUser is not defined
    const uid = auth.currentUser ? auth.currentUser.uid : '';

    const [meetingData, setMeetingData] = useState<Meeting>({
        name: '',
        owner: uid,
        members: [uid],
        createdOn: firestoreTimestamp,
        isDeleted: false,
        isArchived: false,
        timeframes: [],
    });

    const handleMeetingDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingData({
            ...meetingData,
            name: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMeeting(meetingData);
    };

    return (
        <div>
            <h1 className="font-bold">Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={meetingData.name}
                    onChange={handleMeetingDataChange}
                    placeholder="title"
                    className='border-2 border-black px-2 py-1'
                />
                <button type="submit" className="border-2 border-black px-2 py-1">
                    Create meeting
                </button>
            </form>
        </div>
    );
}

export default Profile;
