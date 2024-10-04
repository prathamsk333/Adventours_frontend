import NavBar from './NavBar';
import Footer from './Footer';
import { useState, useEffect, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signUpPOST } from '../../util/http';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import PopUp from './PopUp';

import Cookies from 'js-cookie';

export default function SignUp() {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: signUpPOST,
  });
  useEffect(() => {
    if (data) {
      Cookies.set('jwt', data.token, { expires: 7, path: '/' });
      setUser(data);
      navigate('../');
    }
  }, [data, navigate, setUser]);

  function handleSubmit() {
    mutate({ name, email, password, passwordConfirm });
  }
  let errmsg;

  if (error) {
    if (error.info.error.code === 11000)
      errmsg = 'entered user email already exist. Please log into your accout';
    else if (error.info.error.errors.name) {
      errmsg = error.info.error.errors.name.message;
    } else if (error.info.error.errors.email) {
      errmsg = error.info.error.errors.email.message;
    } else if (error.info.error.errors.passwordConfirm) {
      errmsg = error.info.error.errors.passwordConfirm.message;
    }
  }

  if (data) {
    Cookies.set('jwt', data.token, { expires: 7, path: '/' });
    const token = Cookies.get('jwt');
    console.log(token);
  }

  return (
    <>
      <NavBar homePage={true} />

      <div className="login-main">
        <div className="login-box">
          <h2 className="login-box-head">CREATE AN ACCOUNT</h2>

          <div className="email-container">
            <p>Name :</p>
            <input
              type="text"
              id="name-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="email-container">
            <p>Email Address:</p>
            <input
              type="email"
              id="email-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="email-container">
            <p>Password:</p>
            <input
              type="password"
              id="password-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="email-container">
            <p>Confirm Password:</p>
            <input
              type="password"
              id="password-confirm-input"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          {isError && <PopUp message={errmsg} />}
          {isPending && (
            <div className="login-pending">Please wait, signing up...</div>
          )}

          <button className="login-page-button" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
