import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';
import Logo from './../../assets/logo.png';


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
      <div className='menu__logo'>
        <img className='menu__logo' src={Logo} alt="Logo" />
      </div>
   
      <ul className='menu__list'>
        {menuItems.map((item, index) => (
          <li className='menu__list-item' key={index}>
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
