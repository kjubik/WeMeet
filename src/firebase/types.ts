
export interface User {
    id?: string;         // This should be the UID from Firebase Authentication
    isDeleted: boolean;
    creationDate: string;
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
    startDate: string;
    endDate: string;
}

export interface Participation {
    id?: string;
    userId: string;
    eventId: string;
}

export interface Invitation {
    id?: string;
    isDeleted: boolean;
    creationDate: string;
    recipientId: string;
    eventId: string;
    senderId: string;
    sendDate: string;
    expirationDate: string;
}

export interface Timeslot {
    id?: string;
    userId: string;
    eventId: string;
    startTime: string;
    endTime: string;
}
