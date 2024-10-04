/* eslint-disable react/prop-types */
import logo from '/AdvenTours.png';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { motion } from 'framer-motion';
import getToken from '@/util/getToken';

export default function NavBar({ homePage }) {
  const { user, setUser } = useContext(UserContext);

  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 540) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const logout = () => {
    console.log(getToken());  
    setUser(null);
    Cookies.remove('jwt', { path: '/', sameSite: 'None', secure: true });
    console.log(getToken());

  };

  return (
    <div className={navbar || homePage ? 'navbar scrolled' : 'navbar'}>
      <Link
        className="navbar-all"
        whileHover={{ scale: 1.1 }}
        style={{
          align: 'center',
          color: 'white',
          margin: '2vw',
          fontFamily: 'poppins',
        }}
        to="/"
      >
        <motion.div whileHover={{scale:1.1}}>All Tours</motion.div>
      </Link>
      <img src={logo} alt="logo" className="logo" />
      <div style={{ color: 'white' }} className="buttons-container">
        {user ? (
          <>
            <motion.button className="logout-button" whileHover={{scale:1.1}} onClick={logout}>
              Logout
            </motion.button>
            <Link to="/Profile">
              <motion.img
              whileHover={{scale:1.013}}
                src={
                  user.data.doc.photo
                    ? `/tour-guides/${user.data.doc.photo}`
                    : '/tour-guides/default.jpg'
                }
                alt="user-png"
                className="nav-bar-user overflow-hidden"
              />
            </Link>

            <p className="navbar-user-text">
              {user.data.doc.name.split(' ')[0]}
            </p>
          </>
        ) : (
          <>
            <button className="login-button">
              <Link to="/login" className="button-text">
              <motion.div whileHover={{scale:1.1, y:-2}}>Login</motion.div>
              </Link>
            </button>
            <button className="signin-button">
              <Link to  ="/signup" className="button-text">
              <motion.div whileHover={{scale:1.1}}>Sign Up</motion.div>
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
