import React, { useState, useEffect } from 'react';
import './styles.scss';
import type { User } from '../../types/types';
import FilterByRole from '../FilterByRole/FilterByRole';
import SearchUser from '../SearchUser/SearchUser';
import { Link } from 'react-router-dom';
import { useGetUsersQuery, useUpdateUserStatusMutation } from '../../store/api/usersApi';

export default function Users() {
  const { data, error, isLoading } = useGetUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    if (data?.users) {
      // Initialize status for users if not already present (e.g., from API)
      const usersWithStatus = data.users.map(user => ({
        ...user,
        status: user.status || 'Active' // Default to 'Active' if status is not provided by API
      }));
      setLocalUsers(usersWithStatus);
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all'); // 'all', 'admin', 'moderator', 'user'

  const toggleUserStatus = async (userId: number, currentStatus: 'Active' | 'Blocked') => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      await updateUserStatus({ id: userId, status: newStatus }).unwrap();
    } catch (err) {
      console.error('Failed to update user status:', err);
    }
  };

  const getFilteredAndSearchedUsers = () => {
    let currentFilteredUsers = localUsers; // Use localUsers for filtering

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

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {'status' in error ? `Error: ${error.status}` : JSON.stringify(error)}</div>;
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
            <th>Status</th>
            <th>Actions</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSearchedUsers.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}> {user.firstName} {user.lastName}</Link></td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
              <td>{user.company.title}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  onClick={() => toggleUserStatus(user.id, user.status)}
                  className={user.status === 'Active' ? 'block-button' : 'activate-button'}
                >
                  {user.status === 'Active' ? 'Block' : 'Activate'}
                </button>
              </td>
              <td><Link to={`/users/${user.id}/edit`}><button className="edit-button">Edit</button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
