<script lang="ts">
    import { user } from "../../../stores";
    import { db } from "../../../firebaseConfig";
    import { collection, addDoc } from "firebase/firestore";

    let eventData = {
        title: '',
        description: '',
        duration: 0,
        start: '',
        end: '',
        is_deleted: false,
        host_id: $user!.uid // can user be null here? maybe for a brief moment on initial load?
    }

    $: console.log(eventData.start, eventData.end);

    $: invalidTimespan = eventData.start >= eventData.end && eventData.start !== '' && eventData.end !== '';

    async function handleCreateEvent() {
        if (eventData.title.trim() === '') {
            alert("Cannot create event. Title cannot be empty.");
            return;
        }

        if (eventData.duration <= 60) {
            alert("Cannot create event. Duration must be greater than 60.");
            return;
        }

        if (eventData.start === '' || eventData.end === '') {
            alert("Cannot create event. Start and end dates cannot be empty.");
            return;
        }
        
        if (invalidTimespan) {
            alert("Cannot create event. Start date must be before end date.");
            return;
        };

        try {
            await addDoc(collection(db, "event"), eventData)
            .then((docRef) => {
                console.log("Event created with ID:", docRef.id);
                eventData = {
                    ...eventData,
                    title: '',
                    description: '',
                    duration: 0,
                    start: '',
                    end: '',
                }
            });
        } catch (error) {
            console.error("Error creating event:", error);
        }
    }

</script>

<h1>Create a new event</h1>
<form>
    <input type="text" placeholder="Title" bind:value={eventData.title}>
    <input type="text" placeholder="Description" bind:value={eventData.description}>
    <input type="number" placeholder="Duration in seconds" bind:value={eventData.duration}>
    <input type="datetime-local" bind:value={eventData.start}>
    <input type="datetime-local" bind:value={eventData.end}>
    <button on:click={handleCreateEvent}>Create event</button>
</form>
{#if invalidTimespan}
    <p>Start date must be before end date.</p>
{/if}
