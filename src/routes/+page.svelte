<script lang="ts">
    import { auth } from '../firebaseConfig';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

    let email = '';
    let password = '';

    const handleSignUp = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User created', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const handleSignIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed in', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

</script>

<h1>Welcome to WeMeet</h1>
<form>
    <input type="email" placeholder="Email" bind:value={email}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button type="button" on:click={() => handleSignUp(email, password)}>Sign Up</button>
    <button type="button" on:click={() => handleSignIn(email, password)}>Sign In</button>
</form>
