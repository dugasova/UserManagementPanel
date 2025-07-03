import React, { useState } from 'react';
import './styles.scss';
import { NavLink, Link } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

   const routes = [
    {
      path: `/`,
      title: `Home`,
    },
    {
      path: `/users`,
      title: `Users`,
    },
    {
      path: `/users/:id`,
      title: `Users Details`,
    },
   {
      path: `/login`,
      title: `Login`,
    },{
      path: `/login`,
      title: `Login`,
    },
  ];
  return (
   
    <nav className='menu'>
      <div className='menu__logo'>
        <img className='menu__logo' src={Logo} alt="Logo" />
      </div>
      <button className='menu__hamburger' onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`menu__list ${isMenuOpen ? 'menu__list--open' : ''}`}>
        {routes.map((item, index) => (
          <li className='menu__list-item' key={index}>
            <NavLink to={item.path}> {item.title} </NavLink>
          </li>
        )
        )}
      </ul>
    </nav>
  )
}
