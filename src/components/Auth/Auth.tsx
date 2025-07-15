import React, { useContext } from 'react';
import './styles.scss';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null; // Or handle the case where context is not available
  }

  const { isLoggedIn, logout } = authContext;

  const handleAuth = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleAuth}>Logout</button>
      ) : (
        <button onClick={handleAuth}>Login</button>
      )}
    </>
  );
}
