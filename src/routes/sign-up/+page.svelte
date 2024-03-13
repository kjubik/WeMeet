<script lang="ts">
    import { auth } from '../../firebaseConfig';
    import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
    import { user } from '../../stores';
    import { query, where, collection, getDocs, type QuerySnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
    import { db } from '../../firebaseConfig';

    let newUser = {
        email: '',
        username: '',
        displayName: ''
    };

    let password = '';

    const handleSignUp = async (email: string, password: string) => {
        // check if the username provided by the user is available
        const takenUsernameQuery = query(collection(db, 'takenUsername'), where('username', '==', newUser.username));
        await getDocs(takenUsernameQuery)
        .then((queryResult: QuerySnapshot) => {
            if (!queryResult.empty) {
                alert('Username already in use. Please select another.');
                return;
            }
            console.log('Username available. Proceeding with user sign up.');
        })
        .catch((error) => {
            console.log('Error when checking username availability', error.code);
            return;
        });

        // create the user in Firebase Auth
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user.set(userCredential.user);
            console.log('User created', $user);
        })
        .catch((error) => {
            if (error.code == 'auth/email-already-in-use') {
                alert('Email already in use');
            } else if (error.code == 'auth/invalid-email') {
                alert('Invalid email');
            } else if (error.code == 'auth/weak-password') {
                alert('Weak password');
            } else {
                console.error('Error: ', error);
            }
            return;
        })

        // create the user doc in Firestore
        console.log('Creating user doc in Firestore', $user);
        const userRef = doc(db, 'user', $user!.uid);
        await setDoc(userRef, newUser)
        .then(() => {
            console.log('Document written');
        })
        .catch((error) => {
            console.error('Failed to create user doc in Firestore: ', error);

            // revert creating user in Firebase Auth
            deleteUser($user!)
            .then(() => {
                console.log('User deleted');
            })
            .catch((error) => {
                console.error('Error deleting user in Firebase Auth: ', error);
                // TODO: notify support team
            });

            return;
        });

        // create the username doc in Firestore
        console.log('Creating username doc in Firestore', $user);
        const usernameRef = doc(db, 'takenUsername', $user!.uid);
        await setDoc(usernameRef, { username: newUser.username })
        .then(() => {
            console.log('Document written');
        })
        .catch((error) => {
            console.error('Failed to create username doc in Firestore: ', error);
            
            // revert creating user in Firebase Auth
            deleteUser($user!)
            .then(() => {
                console.log('User deleted in Firebase Auth');
            })
            .catch((error) => {
                console.error('Error deleting user in Firebase Auth: ', error);
                // TODO: notify support team
            });

            // revert creating user doc in Firestore
            deleteDoc(userRef)
            .then(() => {
                console.log('User doc deleted in Firestore from "user" collection');
            })
            .catch((error: any) => {
                console.error('Error deleting user doc in Firestore: ', error);
                // TODO: notify support team
            });

            alert('An error occured while creating your account. Please try again. If the problem persists, please contact support.');
            return;
        });

        alert('Account created!');
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
