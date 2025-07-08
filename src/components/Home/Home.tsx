import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import getUsers from '../../services/user';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import SearchUser from '../SearchUser/SearchUser';
import type { User } from '../../types/types';


export default function Home() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers.get();
      setUsersList(response.users);
      setFilteredUsers(response.users); // Initialize filtered users with all users
      console.log("Users fetched successfully:", response);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newFilteredUsers = usersList.filter(user =>
      user.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
      user.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm) ||
      user.phone.toLowerCase().includes(lowercasedSearchTerm) ||
      user.company.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(newFilteredUsers);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="error-message">Failed to load users. Please try again later.</div>;
  }

  return (
    <div className="users-table-container">
      <h2>User Dashboard</h2>
      <SearchUser onSearchChange={handleSearch} />
      {filteredUsers.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
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
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-users-message">No users found.</div>
      )}
    </div>
  );
}
