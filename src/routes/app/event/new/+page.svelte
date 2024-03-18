<script lang="ts">
    import { db } from "../../../../firebaseConfig";
    import { user } from "$stores/user";
    import { collection, addDoc } from "firebase/firestore";
    import { goto } from "$app/navigation";

    let eventData = {
        title: '',
        description: '',
        duration: 0,
        start: '',
        end: '',
        is_deleted: false,
        host_id: $user!.uid // can user be null here? maybe for a brief moment on initial load?
    }

    let createdEventId: string;

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
                createdEventId = docRef.id;
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
            return;
        }

        alert("Event created successfully!");
        goto(`/event/${createdEventId}`);
    }

</script>

<h1>Create a new event</h1>
<form on:submit|preventDefault={handleCreateEvent}>
    <input type="text" placeholder="Title" bind:value={eventData.title}>
    <input type="text" placeholder="Description" bind:value={eventData.description}>
    <input type="number" placeholder="Duration in seconds" bind:value={eventData.duration}>
    <input type="datetime-local" bind:value={eventData.start}>
    <input type="datetime-local" bind:value={eventData.end}>
    <button type="submit">Create event</button>
</form>
{#if invalidTimespan}
    <p>Start date must be before end date.</p>
{/if}
