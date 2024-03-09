<script lang="ts">
    import { user } from '../../../stores';
    import { onMount } from 'svelte';
    import { db } from '../../../firebaseConfig';
    import { getDoc, doc } from 'firebase/firestore';

    let userData: any;
    let isLoaded = false;

    onMount(async () => {
        try {
            console.log('user', $user?.uid);
            await getDoc(doc(db, 'user', $user!.uid))
            .then((docRef) => {
                userData = docRef.data();
            })
            console.log('userData', userData);
            isLoaded = true;
        } catch (error) {
            console.error('Error getting document:', error);
        }
    });

</script>

{#if isLoaded}
    <h1>Profile</h1>
    <h2>{userData.displayName}</h2>
    <h3>@{userData.username}</h3>
    <h4>✉ {userData.email}</h4>
{/if}
<a href="/app/event">Create a new event</a>
