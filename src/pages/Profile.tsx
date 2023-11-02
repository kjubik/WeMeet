import { getAuth, signOut } from "@firebase/auth";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect, useState } from "react";
import { getUser } from "../firebase/firestore";
import { User } from "../firebase/types";

function Profile() {

    const auth = getAuth();
    const [userData, setUserData] = useState<User>(); // State to store user's data

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                window.location.reload(); // Reload the page after successful sign out
            })
            .catch((error) => {
                console.log("Error signing out:", error);
            });
    };

    useEffect(() => {
        if (auth.currentUser) {
            getUser(auth.currentUser.uid).then((user) => {
                setUserData(user);
            });
        }
    }, []);


    return (
        <div className="w-full">
            <div className="mx-auto max-w-sm flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center">{userData?.name}</h1>
                <h2 className="mt-1 text-neutral-500">{userData?.email}</h2>
                <div className="mt-8">
                    <PrimaryButton buttonText="Sign Out" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
