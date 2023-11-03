import { Event } from '../firebase/types';

interface EventPreviewCardProps {
    event: Event,
}

function EventPreviewCard({ event }: EventPreviewCardProps) {

    const handleDeleteEvent = async () => {
        event.isDeleted = true;
        location.reload();
    }

    return (
        <div className="max-w-sm flex flex-col gap-8">
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row-reverse">
                    <button onClick={handleDeleteEvent}
                    className="font-semibold text-red-500">Delete</button>
                    <h2 className='w-full text-2xl font-semibold'>{event.title}</h2>
                </div>
                <h3 className="w-full text-md font-normal text-neutral-500">{event.description ? event.description : "No description"}</h3>
                <p>{event.date} at {event.time}</p>
            </div>
        </div>
    )
}

export default EventPreviewCard;
