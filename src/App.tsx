import UserStatus from './components/Auth/UserStatus';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDr3WFxCxZQKms1Jy-hGjW2x6B7oPiDNAw",
    authDomain: "wemeet-fd684.firebaseapp.com",
    projectId: "wemeet-fd684",
    storageBucket: "wemeet-fd684.appspot.com",
    messagingSenderId: "105785457128",
    appId: "1:105785457128:web:1027db414ae82d6e430c5d"
};

initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <h1 className='text-3xl font-bold'>WeMeet</h1>
      <UserStatus />
    </div>
  )
}

export default App
