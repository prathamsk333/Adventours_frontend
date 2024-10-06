import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { UserContext } from './UserContext';
import getToken from '@/util/getToken';

export default function NavBar({ homePage }) {
  const { user, setUser } = useContext(UserContext);
  const [navbar, setNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 540);
    };

    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  const logout = () => {
    console.log(getToken());
    setUser(null);
    Cookies.remove('jwt', { path: '/', sameSite: 'None', secure: true });
    console.log(getToken());
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navbar
          ? 'bg-black bg-opacity-60'
          : mobileMenuOpen
          ? 'bg-black bg-opacity-60 '
          : homePage
          ? 'bg-black bg-opacity-60 '
          : 'bg-black bg-opacity-10'
      }`}
    >
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center overflow-hidden w-[9.5rem] h-[3rem]"
          >
            <img
              src="/AdvenTours.png"
              alt="AdvenTours logo"
              className="h-[5rem] w-[6.7rem] transform transition-transform duration-300 scale-[1.5] overflow-hidden"
            />
          </Link>

          <div className="hidden md:flex items-center  space-x-4">
            <AnimatePresence>
              {user ? (
                <div className="flex items-center space-x-5">
                  <motion.button
                    className="px-3 py-1 text-white  rounded hover:bg-gray-400 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/profile">Settings</Link>
                  </motion.button>
                  <motion.button
                    className="px-3 py-1 text-white  rounded hover:bg-gray-400 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/mybookings/getMyBookings">My Bookings</Link>
                  </motion.button>
                  <motion.button
                    className="px-3 py-1 text-white  rounded hover:bg-gray-400 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                  >
                    Logout
                  </motion.button>
                  <Link to='/profile'>
                  <img
                    src={
                      user.data.doc.photo
                        ? `/tour-guides/${user.data.doc.photo}`
                        : '/tour-guides/default.jpg'
                    }
                    alt={user.data.doc.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  </Link>
                </div>
              ) : (
                <>
                  <motion.button
                    className="px-4 py-2 text-gray-900 bg-white rounded hover:bg-gray-100 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/login">Login</Link>
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/signup">Sign Up</Link>
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <Link
              to="/"
              className="block text-white hover:text-gray-300 transition-colors py-2"
            >
              All Tours
            </Link>
            {user ? (
              <>
                <Link
                  to="/settings"
                  className="block text-white hover:text-gray-300 transition-colors py-2"
                >
                  Settings
                </Link>
                <Link
                  to="/my-bookings"
                  className="block text-white hover:text-gray-300 transition-colors py-2"
                >
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="block text-white hover:text-gray-300 transition-colors py-2 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-gray-300 transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-white hover:text-gray-300 transition-colors py-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
