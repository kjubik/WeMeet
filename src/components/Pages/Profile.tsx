import { getAllUserDocumentIds } from "../Database/ShowData";

async function fetchUserDocumentIds() {
    try {
        const documentIds = await getAllUserDocumentIds();
        console.log('User Document IDs:', documentIds);
        // You can now use the document IDs as needed
    } catch (error) {
        console.error('Error fetching user document IDs:', error);
    }
}

function Profile() {
    return (
        <div>
            <h1 className="font-bold">Profile Page</h1>
            <button onClick={fetchUserDocumentIds}>fetch user ids</button>
        </div>
    );
}

export default Profile;