import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  const menuItems = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/login',
      title: 'Login'
    },
    {
      path: '/dashboard',
      title: 'Dashboard'
    },
    {
      path: '/users',
      title: 'All Users'
    },
      {
      path: '/users/:id',
      title: 'User Details'
    },
  ]
  return (
    <nav className='menu'>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}>
              {item.title}
            </NavLink>
          </li>
        )
        )}
      </ul>
    </nav>
  )
}
