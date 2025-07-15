import React from 'react';
import Menu from '../../components/Menu/Menu';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className='header'>
      <div className="logo-content" onClick={() => navigate('/')}></div>
      <div className="header-actions">
        <Menu />
      </div>
    </header>
  );
}
