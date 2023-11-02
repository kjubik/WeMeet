
export interface User {
    id: string;         // This should be the UID from Firebase Authentication
    username: string;
    name: string;
    email: string;
    events: string[];
    eventInvites: string[];
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    organizer: string | undefined;
    participants: (string | undefined)[];
    invitees: string[];
}
