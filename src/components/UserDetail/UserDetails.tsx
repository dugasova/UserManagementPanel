import React, { useState, useEffect } from 'react';
import './styles.scss';
import getUsers from '../../services/user';
import type { User } from '../../types/types';

interface UserDetailsProps {
  id: number;
}

export default function UserDetails({ id }: UserDetailsProps) {
  const [details, setDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resp = await getUsers.getDetails(id);
        setDetails(resp);
        console.log("User details fetched successfully:", resp);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>No user details found.</div>;
  }

  return (
    <div className="user-details">
      <h2>{`${details.firstName} ${details.lastName}`}</h2>
      <p><strong>ID: </strong> {details.id}</p>
      <img src={details.image} alt={`${details.firstName} ${details.lastName}`} />
      <p><strong>Name: </strong> {details.firstName} {details.lastName}</p>
      <p><strong>Username: </strong> {details.username}</p>
      <p><strong>Email: </strong> {details.email}</p>
      <p><strong>Phone: </strong> {details.phone}</p>
      <p><strong>Company: </strong>{details.company?.name}</p>
      <br />
      <div className="address-separator"></div>
      <p className='user-details__address'><strong>Personal Address: </strong></p>
      <ul>
        <li><strong>Address: </strong> {details.address.address}</li>
        <li><strong>City: </strong> {details.address.city}</li>
        <li><strong>State: </strong> {details.address.state}</li>
        <li><strong>Postal Code: </strong> {details.address.postalCode}</li>
      </ul>
      <br />
      <div className="address-separator"></div>
      <p><strong>Company Address: </strong></p>
      
      <ul>
        <li><strong>Address: </strong> {details.company.address.address}</li>
        <li><strong>City: </strong> {details.company.address.city}</li>
        <li><strong>State: </strong> {details.company.address.state}</li>
        <li><strong>Postal Code: </strong> {details.company.address.postalCode}</li>
      </ul>

    </div>
  );
}
