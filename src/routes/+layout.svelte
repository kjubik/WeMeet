<script lang="ts">
    import { auth } from "../firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";
    import { user } from "../stores";

    onAuthStateChanged(auth, (currentUser) => {
        user.set(currentUser);
    });
</script>

<slot />
