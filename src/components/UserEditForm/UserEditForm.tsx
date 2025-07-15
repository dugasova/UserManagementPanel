import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../store/api/usersApi';
import './styles.scss';

// Define the Zod schema for user editing
const userEditSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  username: z.string().min(1, 'Username is required'),
  role: z.enum(['admin', 'moderator', 'user'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
});

type UserEditFormData = z.infer<typeof userEditSchema>;

interface UserEditFormProps {
  id: number;
}

export default function UserEditForm({ id }: UserEditFormProps) {
  const { data: user, error, isLoading } = useGetUserDetailsQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role as 'admin' | 'moderator' | 'user',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserEditFormData) => {
    if (id) {
      try {
        await updateUser({ id, ...data }).unwrap();
        navigate(`/users/${id}`);
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
      <form onSubmit={handleSubmit(onSubmit)} className="user-edit-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            {...register('phone')}
          />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username')}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            {...register('role')}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          {errors.role && <p className="error-message">{errors.role.message}</p>}
        </div>
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
