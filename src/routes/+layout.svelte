<script lang="ts">
    import { auth } from "../firebaseConfig";
    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { user } from "$stores/user";

    onAuthStateChanged(auth, (currentUser) => {
        user.set(currentUser);
    });

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            signOut(auth);
            user.set(null);
            console.log('User signed out');
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
</script>

{#if $user}
    <button on:click={handleSignOut}>Sign Out</button>
{/if}
<slot />
