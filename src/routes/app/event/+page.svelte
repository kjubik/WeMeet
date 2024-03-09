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

    $: console.log(eventData);

    async function handleCreateEvent() {
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
