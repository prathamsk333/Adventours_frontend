/* eslint-disable react/prop-types */
import NavBar from './NavBar';
import Footer from './Footer';
import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginPOST } from '../../util/http';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from './UserContext';
import PopUp from './PopUp';
import { motion } from 'framer-motion';
import getToken from '@/util/getToken';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: loginPOST,
  });

  function handleSubmit() {
    mutate({ email, password });
  }

  useEffect(() => {
    if (data) {
      Cookies.remove('jwt', { path: '/' });
      Cookies.set('jwt', data.token, { expires: 7, path: '/' });  
      setUser(data);  
      navigate('../');
    }
  }, [data]);
  
  let errmsg;
  if (error) {
    console.log(error.info);
    if (error.info.message) {
      if (
        error.info.message ==
        "Cannot read properties of null (reading 'passwordCorrect')"
      )
        errmsg = 'Please enter valid details';
    } else errmsg = error.info.message;
  }

  return (
    <>
      <NavBar homePage={true} />

      <div className="login-main">
        <div className="login-box">
          <h2 className="login-box-head">LOG IN TO YOUR ACCOUNT</h2>
          <div className="email-container">
            <p>Email Address:</p>
            <input
              type="email"
              id="email-input"
              placeholder=" Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="email-container">
            <p>Password:</p>
            <input
              type="password"
              id="password-input"
              placeholder=" Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isError && (
            <PopUp message={`${errmsg} Please Try again!`} />
            // <div className="login-error-message">
            //   {' '}
            //   {error.info.message}! Pleaes try again{' '}
            // </div>
          )}
          {isPending && (
            <div className="login-pending">Please wait logging in</div>
          )}
          <motion.button
            className="login-page-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleSubmit}
          >
            Login
          </motion.button>
        </div>
      </div>

      <Footer />
    </>
  );
}
