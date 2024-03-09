<script lang="ts">
    import { auth } from '../../firebaseConfig';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { user } from '../../stores';

    let newUser = {
        email: '',
        username: '',
        displayName: ''
    };

    let password = '';

    const handleSignUp = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user.set(userCredential.user);
            console.log('User created', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

</script>

<h1>Sign Up</h1>
<form>
    <input type="email" placeholder="Email" bind:value={newUser.email}>
    <input type="password" placeholder="Password" bind:value={password}>
    <input type="text" placeholder="Username" bind:value={newUser.username}>
    <input type="text" placeholder="Display Name" bind:value={newUser.displayName}>
    <button type="button" on:click={() => handleSignUp(newUser.email, password)}>Sign Up</button>
</form>
