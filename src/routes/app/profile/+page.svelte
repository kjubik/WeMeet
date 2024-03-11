<script lang="ts">
    import { user } from '../../../stores';
    import { onMount } from 'svelte';
    import { db } from '../../../firebaseConfig';
    import { getDoc, doc } from 'firebase/firestore';
    import { storage } from '../../../firebaseConfig';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

    let userData: any;
    let isLoaded = false;
    let uploadedFiles: FileList;
    $: profilePicture = uploadedFiles?.[0];
    $: console.log('profilePicture', profilePicture);
    let downloadURL: string;
    $: console.log('View the uploaded image at', downloadURL)

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

        try {
            const profilePictureRef = ref(storage, `profilePictures/${$user!.uid}`);
            downloadURL = await getDownloadURL(profilePictureRef);
            console.log('Profile picture URL:', downloadURL);
        } catch (error) {
            console.error('Error getting profile picture:', error);
        }
    });

    const handleUploadImage = async () => {
        const profilePictureRef = ref(storage, `profilePictures/${$user!.uid}`);
        try {
            // Upload the profile picture to storage
            await uploadBytes(profilePictureRef, profilePicture, { contentType: profilePicture.type });

            // Get the download URL of the uploaded image
            downloadURL = await getDownloadURL(profilePictureRef);

            console.log('Profile picture uploaded successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    }

</script>

{#if isLoaded}
    <h1>Profile</h1>
    <h2>{userData.displayName}</h2>
    <img src={downloadURL} alt={`${userData.displayName}'s profile picture`} height="128">
    <h3>@{userData.username}</h3>
    <h4>✉ {userData.email}</h4>
{/if}
<input type="file" id="profile-picture" accept="image/png, image/jpeg, image/webp" bind:files={uploadedFiles}>
<br/>
<button on:click={handleUploadImage}>Uplaod a profile picture</button>
<br/>
<br/>
<a href="/app/event">Create a new event</a>
