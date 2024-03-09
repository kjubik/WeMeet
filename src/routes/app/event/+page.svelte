<script lang="ts">

    let eventData = {
        title: '',
        description: '',
        duration: 0,
        start: '',
        end: ''
    }

    $: console.log(eventData);

    function handleCreateEvent() {
        console.log('Creating event', eventData);
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
