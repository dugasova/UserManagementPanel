import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../store/api/usersApi';
import type { User } from '../../types/types';
import './styles.scss';

interface UserEditFormProps {
  id: number;
}

export default function UserEditForm({ id }: UserEditFormProps) {
  const { data: user, error, isLoading } = useGetUserDetailsQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
        // Add other fields as needed for editing
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await updateUser({ id, ...formData }).unwrap();
        navigate(`/users/${id}`); // Navigate back to user details after successful update
      } catch (err) {
        console.error('Failed to update user:', err);
        alert('Failed to update user. Please try again.');
      }
    }
  };

  if (isLoading) {
    return <div>Loading user data for editing...</div>;
  }

  if (error) {
    return <div>Error loading user data: {'status' in error ? `Error: ${error.status}` : JSON.stringify(error)}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="user-edit-form-container">
      <h1>Edit User: {user.firstName} {user.lastName}</h1>
      <form onSubmit={handleSubmit} className="user-edit-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>
        {/* Add more fields as necessary */}
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => navigate(`/users/${id}`)} disabled={isUpdating}>
          Cancel
        </button>
      </form>
    </div>
  );
}
