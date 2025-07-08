import React, { useEffect, useState } from 'react';
import './styles.scss';
import getUsers from '../../services/user';
import type { User } from '../../types/types';

import SearchUser from '../SearchUser/SearchUser';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers.get();
        setUsers(response.users);
        setFilteredUsers(response.users); // Initialize filtered users with all users
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newFilteredUsers = users.filter(user =>
      user.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
      user.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm) ||
      user.phone.toLowerCase().includes(lowercasedSearchTerm) ||
      user.company.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(newFilteredUsers);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <h1>User List</h1>
      <SearchUser onSearchChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company Name</th>
            <th>Profession</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}> {user.firstName} {user.lastName}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
              <td>{user.company.title}</td>
              <td>{user.role}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
