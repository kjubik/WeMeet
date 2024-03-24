<script lang="ts">
    import { page } from '$app/stores';
    import { getEventData } from '$lib/services/event';
    import type { EventData } from '$lib/types/event';
    import { onMount } from 'svelte';

    const eventId = $page.params.event_id;
    let eventData: EventData;
    let isLoaded = false; // Set initial value to false

    onMount(async () => {
        try {
            const response = await getEventData(eventId);
            if (response) {
                eventData = response;
                isLoaded = true; // Update isLoaded to true after successful response
            }
        } catch (error) {
            console.error('Error getting event data:', error);
        }
    });

</script>

{#if isLoaded}
    <h1>{eventData.title}</h1>
    <p>{eventData.description}</p>
    <h2>Hosted by: {eventData.host_id}</h2>
    <p>Duration: {eventData.duration} (converted to appropriate format)</p>
    <p>Start date: {eventData.start} - End date: {eventData.end}</p>
{/if}
