import React, { useEffect, useState } from 'react';
import './styles.scss';
import getUsers from '../../services/user';
import type { User } from '../../types/types';
import FilterByRole from '../FilterByRole/FilterByRole';  

import SearchUser from '../SearchUser/SearchUser';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all'); // 'all', 'admin', 'moderator', 'user'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers.get();
        setUsers(response.users);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getFilteredAndSearchedUsers = () => {
    let currentFilteredUsers = users;

    // Apply role filter
    if (selectedRole !== 'all') {
      currentFilteredUsers = currentFilteredUsers.filter(user => user.role.toLowerCase() === selectedRole.toLowerCase());
    }

    // Apply search term filter
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      currentFilteredUsers = currentFilteredUsers.filter(user =>
        user.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
        user.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
        user.email.toLowerCase().includes(lowercasedSearchTerm) ||
        user.phone.toLowerCase().includes(lowercasedSearchTerm) ||
        user.company.name.toLowerCase().includes(lowercasedSearchTerm)
      );
    }
    return currentFilteredUsers;
  };

  const filteredAndSearchedUsers = getFilteredAndSearchedUsers();

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <h1>User List</h1>
      <div className="filters-container">
        <SearchUser onSearchChange={setSearchTerm} />
        <FilterByRole onRoleChange={setSelectedRole} />
      </div>
      {filteredAndSearchedUsers.length === 0 && <div>No users found.</div>}
      <div className="users-count">
        Total Users: {filteredAndSearchedUsers.length}
      </div>
      <div className="users-table-header"></div>
        <h2>Users Dashboard</h2>
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
          {filteredAndSearchedUsers.map((user) => (
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
