<script lang="ts">
    import { user } from '$stores/user';

</script>

{#if $user}
    <slot/>
{:else}
    <p>You must be signed in to use the app.</p>
{/if}
