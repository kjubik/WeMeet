import { useEffect, useState } from "react";
import { getUsers } from "../../firebase/firestore";
import { User } from "../../firebase/types";

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setUsers(await getUsers());
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <h2 className="font-semibold">{user.email}</h2>
                </div>
            ))}
        </div>
    );
}

export default UsersList;
