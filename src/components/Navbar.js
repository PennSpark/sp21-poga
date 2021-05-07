import React, {useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import '../style/Navbar.css';
import { IconContext } from 'react-icons/lib';
import firebase from "firebase/app";
import "firebase/auth";
import config from "../screens/SignUpPage/config";
import { IfFirebaseAuthed, IfFirebaseUnAuthed, FirebaseAuthProvider } from "@react-firebase/auth";
import logo from '../images/pogalogo.png';

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

      const history = useHistory();
      const onLogout = () => {
        firebase.auth().signOut().then(function() {
          firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
              history.push("/sign-up");
            }
          });
        }).catch(function(error) {
          console.log(error);
        });
      }

      return (
        <>
        <FirebaseAuthProvider {...config} firebase={firebase}>
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
                  
                  <IfFirebaseAuthed>
                  <li className='nav-item'>
                    <Link
                      to='/tf-page'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                      Start a Session
                    </Link>
                  </li>
                  </IfFirebaseAuthed>

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
                    

                  <IfFirebaseUnAuthed>
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
                    </IfFirebaseUnAuthed>
                    <IfFirebaseAuthed>
                    {button ? (
                      <div className='btn-link'>
                        <Button buttonStyle='btn--outline' onClick={() => onLogout()}> Sign out</Button>
                      </div>
                    ) : (
                      <div className='btn-link'>
                        <Button
                          buttonStyle='btn--outline'
                          buttonSize='btn--mobile'
                          onClick={() => onLogout()}
                        >
                          Sign out
                        </Button>
                        </div>
                    )}
                    </IfFirebaseAuthed>

                   
                  </li>
                </ul>
              </div>
            </nav>
            </IconContext.Provider>
            </FirebaseAuthProvider>
        </>
      );
    }

export default Navbar
