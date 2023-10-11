import { Timestamp, DocumentReference } from "firebase/firestore"

export type Timeframe = {
    start: Timestamp,
    end: Timestamp,
    user: DocumentReference,
}

export type Meeting = {
    name: string,
    owner: string,
    members: string[],
    createdOn: Timestamp,
    isDeleted: boolean,
    isArchived: boolean,
    timeframes: Timeframe[],
}