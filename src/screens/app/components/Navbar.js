import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiPlantLine } from 'react-icons/ri';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import logo from './pogalogo.png';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };

      window.addEventListener('resize', showButton);

      return (
        <>
          <IconContext.Provider value={{ color: '#ca7df9' }}>
            <nav className='navbar'>
              <div className='navbar-container container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                  {/* <RiPlantLine className='navbar-icon' /> */}
                  <img className="navbar-image" src={logo} alt="Logo"/>
                  poga
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  {click ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/leaderboard'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/profile'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className='nav-btn'>
                    {button ? (
                      <Link to='/sign-up' className='btn-link'>
                        <Button buttonStyle='btn--outline'>GET STARTED</Button>
                      </Link>
                    ) : (
                      <Link to='/sign-up' className='btn-link'>
                        <Button
                          buttonStyle='btn--outline'
                          buttonSize='btn--mobile'
                          onClick={closeMobileMenu}
                        >
                          GET STARTED
                        </Button>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </nav>
            </IconContext.Provider>
        </>
      );
    }

export default Navbar
