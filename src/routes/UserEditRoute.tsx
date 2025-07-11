import React from 'react';
import { useParams } from 'react-router-dom';
import UserEditForm from '../components/UserEditForm/UserEditForm';

export default function UserEditRoute() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : undefined;

  if (userId === undefined) {
    return <div>Error: User ID not provided in URL for editing.</div>;
  }

  return (
    <UserEditForm id={userId} />
  );
}
