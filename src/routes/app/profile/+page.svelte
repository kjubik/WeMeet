<script lang="ts">
    import { user } from '../../../stores';

</script>

<h1>Profile</h1>
<p>Welcome to your profile {$user?.email}.</p>
<a href="/app/event">Create a new event</a>
