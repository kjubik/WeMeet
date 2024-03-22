export interface EventData {
    description: string;
    duration: number; // in seconds
    end: string;
    host_id: string;
    start: string;
    title: string;
}

export interface Event extends EventData {
    id: string;
}
