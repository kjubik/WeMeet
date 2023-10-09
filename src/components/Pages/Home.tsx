import UserStatus from '../Auth/UserStatus.tsx';

function Home(){
    return(
        <div>
            <h1 className="font-bold">Home Page</h1>
            <UserStatus />
        </div>
    );
}

export default Home;