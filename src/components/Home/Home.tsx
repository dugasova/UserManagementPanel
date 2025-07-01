import React, { useEffect, useState } from 'react';
import './styles.scss';
import getUsers from '../../services/user';



export default function Home() {
  const [usersList, setUsersList] = useState([]);

  const users = async () => {
    try {
      const response = await getUsers.get();
      setUsersList(response);
      console.log("Users fetched successfully:", response);

    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }

  useEffect(() => {
    users();
  }, []);

  return usersList.length ? (
    <ul>
      {usersList.map((user) => (
        <li key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
        </li>
      ))}
    </ul>
   
    
  ) : null
}
