import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/UserDetail/UserDetails';

export default function UserDetailsRoute() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : undefined;

  if (userId === undefined) {
    return <div>Error: User ID not provided in URL.</div>;
  }

  return (
    <UserDetails id={userId} />
  );
}
