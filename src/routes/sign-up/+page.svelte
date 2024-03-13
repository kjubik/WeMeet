<script lang="ts">
    import { auth } from '../../firebaseConfig';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { user } from '../../stores';
    import { query, where, collection, getDocs } from 'firebase/firestore';
    import type { QuerySnapshot } from 'firebase/firestore';
    import { db } from '../../firebaseConfig';

    let newUser = {
        email: '',
        username: '',
        displayName: ''
    };

    let password = '';

    const handleSignUp = async (email: string, password: string) => {
        try {
            const takenUsernameQuery = query(collection(db, 'takenUsername'), where('username', '==', newUser.username));
            const queryResult: QuerySnapshot = await getDocs(takenUsernameQuery);
            if (!queryResult.empty) {
                alert('Username already in use');
                return;
            }
        } catch (error) {
            console.log('Error: ', error);
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user.set(userCredential.user);
            console.log('User created', user);
        })
        .catch((error) => {
            if (error.code == 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                alert('Error: ' + error.message);
            }
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
