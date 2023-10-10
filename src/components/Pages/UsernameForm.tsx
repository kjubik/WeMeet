import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../App';
import { addDocToCollection } from '../Database/firestoreUtils';

interface UserData {
  username: string;
  email: string;
}

const UsernameForm: FC = () => {
  const [username, setUsername] = useState<string>('');
  const currentUser = auth.currentUser;

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentUser) {
      const userData: UserData = {
        username: username,
        email: currentUser.email || '',
      };

      try {
        await addDocToCollection('users', currentUser.uid, userData);
        navigate('/profile')
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div>
      <h1 className="font-bold">You don't have a username yet!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="border-2 border-black px-2 py-1"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit" className="border-2 border-black px-2 py-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
