import { Event } from '../firebase/types';

interface EventPreviewCardProps {
    event: Event,
}

function EventPreviewCard({ event }: EventPreviewCardProps) {

    return (
        <div className="max-w-sm flex flex-col gap-8">
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row-reverse">
                    <button className="font-semibold text-neutral-400">Delete</button>
                    <h2 className='w-full text-2xl font-semibold'>{event.title}</h2>
                </div>
                <h3 className="w-full text-md font-normal text-neutral-500">{event.description ? event.description : "No description"}</h3>
            </div>
            <div className='flex flex-col gap-3'>
                {/* <button
                className="bg-black rounded-full text-white font-semibold py-2 text-md w-full">
                    View event
                </button> */}
                <button
                className="bg-neutral-200 rounded-full text-black font-semibold py-2 text-md w-full">
                    Edit event
                </button>
            </div>
        </div>
    )
}

export default EventPreviewCard;
