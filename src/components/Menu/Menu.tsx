import React, { useState, useEffect, useRef, useContext } from 'react';
import './styles.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../contexts/AuthContext';


export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

   const routes = [
    {
      path: `/`,
      title: `Home`,
      authRequired: false,
    },
    {
      path: `/users`,
      title: `Users`,
      authRequired: true,
    },
    {
      path: `/users/:id`,
      title: `Users Details`,
      authRequired: true,
    },
    {
       path: `/dashboard`,
      title: `Dashboard`,
      authRequired: true,
    },
    {
      path: `/admin`,
      title: `Admin`,
      authRequired: true,
    }
  ];

  const handleLoginLogout = () => {
    if (authContext?.isLoggedIn) {
      authContext.logout();
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false); // Close menu after action
  };

  return (
   
    <nav className='menu' ref={menuRef}>
      <div className='menu__logo'>
        <img className='menu__logo' src={Logo} alt="Logo" />
      </div>
      <button className='menu__hamburger' onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`menu__list ${isMenuOpen ? 'menu__list--open' : ''}`}>
        {routes.map((item, index) => (
          (!item.authRequired || authContext?.isLoggedIn) && (
            <li className='menu__list-item' key={index}>
              <NavLink to={item.path} onClick={() => setIsMenuOpen(false)}> {item.title} </NavLink>
            </li>
          )
        )
        )}
        <li className='menu__list-item'>
          <button onClick={handleLoginLogout}>
            {authContext?.isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
