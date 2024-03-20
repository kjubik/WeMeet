<script lang="ts">
    
    let upcomingEvents: any[] = [];

    let showOngoing = false;
    let showPast = false;

    let selectedTab: 'upcoming' | 'ongoing' | 'past' = 'upcoming';

</script>

<h1>My Events</h1>
<div>
    <button>Upcoming</button>
    <button disabled={!showOngoing}>Ongoing</button>
    <button disabled={!showPast}>Past</button>
</div>

<div>
{#if selectedTab == 'upcoming'}
    
    {#if upcomingEvents.length == 0}
    
        <p>No upcoming events</p>
    
    {:else}

        <ul>
            {#each upcomingEvents as event}
            <li>{event.name}</li>
            {/each}
        </ul>

    {/if}

{:else if selectedTab == 'ongoing'}

{:else if selectedTab == 'past'}

{/if}
</div>
