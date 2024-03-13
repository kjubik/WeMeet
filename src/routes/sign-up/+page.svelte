<script lang="ts">
    import { auth } from '../../firebaseConfig';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { user } from '../../stores';
    import { getDocs, query, collection, where, QuerySnapshot } from 'firebase/firestore';
    import { db } from '../../firebaseConfig';

    let newUser = {
        email: '',
        username: '',
        displayName: ''
    };

    let password = '';

    const handleSignUp = async (email: string, password: string) => {
        try {
            const q = query(collection(db, "user"), where("email", "==", newUser.email));
            const querySnapshot: QuerySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert('Email already in use. Please use another email.');
                return;
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }

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
