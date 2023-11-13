import { Timestamp } from "firebase/firestore";

export interface User {
    id?: string;         // This should be the UID from Firebase Authentication
    isDeleted: boolean;
    creationDate: Timestamp;
    username: string;
    displayName: string;
    email: string;
    isEnabled: boolean;
}

export interface Event {
    id?: string;
    isDeleted: boolean;
    creationDate: string;
    title: string;
    ownerId: string;
    description: string;
    location: string;       // this should allow for more complexity (online with link what platform, in-person location, etc.)
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    tags: string[];
    isPrivate: boolean;
    createdBy: string;
    startDate: Timestamp;
    endDate: Timestamp;
}

export interface Participation {
    id?: string;
    userId: string;
    eventId: string;
}

export interface Invitation {
    id?: string;
    isDeleted: boolean;
    creationDate: Timestamp;
    recipientId: string;
    eventId: string;
    senderId: string;
    expirationDate: Timestamp;
}

export interface Timeslot {
    id?: string;
    userId: string;
    eventId: string;
    startTime: Timestamp;
    endTime: Timestamp;
}
