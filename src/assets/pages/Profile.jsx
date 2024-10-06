import NavBar from './NavBar';
import Footer from './Footer';
import { UserContext } from './UserContext';
import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { updateMe, updateMyPassword } from '@/util/http';
import PopUp from './PopUp';
import Cookies from 'js-cookie';


import getToken from '@/util/getToken';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('settings');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Mutation for updating user details
  const {
    mutate: mutateUserDetails,
    data: userData,
    isPending: isUpdatingUser,
    isError: userUpdateError,
    error: userUpdateErrorMsg,
  } = useMutation({
    mutationFn: updateMe,
  });

  // Mutation for updating password
  const {
    mutate: mutatePassword,
    data: passwordData,
    isPending: isUpdatingPassword,
    isError: passwordUpdateError,
    error: passwordUpdateErrorMsg,
  } = useMutation({
    mutationFn: updateMyPassword,
  });

  useEffect(() => {
    if (user && userData && userData.doc) {
      const updatedUser = {
        status: 'success',
        token: user.token,
        data: userData,
      };
      setUser(updatedUser);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (passwordData?.token) {
      const token = getToken();
      console.log('Current token before setting:', token);

      Cookies.remove('jwt', { path: '/', sameSite: 'None' });

      Cookies.set('jwt', passwordData.token, {
        expires: 7,
        path: '/',
        sameSite: 'None',
      });

      setTimeout(() => {
        console.log('New token set:', getToken());
      }, 100); 
    }
  }, [passwordData]);

  function handleUpdateUserDetails() {
    mutateUserDetails({ name, email });
  }

  function handleUpdatePassword() {
    mutatePassword({
      passwordCurrent: currentPassword,
      password: newPassword,
      passwordConfirm: newPassword,
    });
  }

  function changePage(page) {
    window.location.href = `/${page}`;
  }

  return (
    <>
      <NavBar />
      <div className="profile-background">

        <div className="profile-box">
          <img
            src={
              user.data.doc.photo
                ? `/tour-guides/${user.data.doc.photo}`
                : '/tour-guides/default.jpg'
            }
            className="profile-img"
            alt="Profile-img"
          />

          <div className="profile-box-content">
            <div className="profile-box-heading">YOUR ACCOUNT SETTING</div>
            <div className="email-container">
              <p>Name:</p>
              <input
                type="text"
                id="name-input"
                placeholder={` ${user.data.doc.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="email-container">
              <p>Email Address:</p>
              <input
                type="email"
                id="email-input"
                placeholder={` ${user.data.doc.email}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="profile-box-request flex items-center justify-center">
              <motion.button
                className="login-page-button"
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={handleUpdateUserDetails}
              >
                Submit
              </motion.button>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} className="mt-8">
                <a href="/">Upload new photo</a>
              </motion.div>

              {userUpdateError && <PopUp message={`Please Try again!`} />}
              {userData && (
                <PopUp
                  message={'User details successfully updated'}
                  err={true}
                />
              )}
            </div>
          </div>
          <hr className="custom-hr" />

          <div className="profile-box-content">
            <div className="profile-box-heading">PASSWORD CHANGE</div>
            <div className="email-container">
              <p>Current password:</p>
              <input
                type="password"
                id="current-password-input"
                placeholder=" Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="email-container">
              <p>New password:</p>
              <input
                type="password"
                id="new-password-input"
                placeholder=" Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <motion.button
              className="login-page-button"
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={handleUpdatePassword}
            >
              Submit
            </motion.button>
            {passwordUpdateError && (
              <PopUp
                message={`Error: ${
                  passwordUpdateErrorMsg.message || 'Please try again!'
                }`}
              />
            )}
            {passwordUpdateError &&
              console.log('Password update error:', passwordUpdateErrorMsg)}
            {passwordData && (
              <PopUp message={'User details successfully updated'} err={true} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
