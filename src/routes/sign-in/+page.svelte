<script lang="ts">
    import { auth } from '$lib/firebaseConfig';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { user } from '$stores/user';

    let email = '';
    let password = '';

    const handleSignIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user.set(userCredential.user);
            console.log('User signed in', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

</script>

<h1>Sign In</h1>
<form>
    <input type="email" placeholder="Email" bind:value={email}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button type="button" on:click={() => handleSignIn(email, password)}>Sign In</button>
</form>
