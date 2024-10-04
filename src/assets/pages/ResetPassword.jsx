import NavBar from './NavBar';
import Footer from './Footer';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../util/http'; // Import the patch function
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from './PopUp';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: resetPassword,
  });

  const handleSubmit = () => {
    mutate({ token, newPassword, confirmPassword });
  };

  if (data) {
    setTimeout(() => {
      navigate('/login');
    }, 4000);
  }

  return (
    <>
      <NavBar homePage={true} />

      <div className="reset-main">
        <div className="reset-box">
          <h2 className="reset-box-head">RESET YOUR PASSWORD</h2>
          <div className="password-container">
            <p>New Password:</p>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              className='reset-input'
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="password-container">
            <p>Confirm Password:</p>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {isError && (
            <PopUp
              message={error?.response?.data?.message || 'Error occurred'}
            />
          )}
          {data && (
            <PopUp message={'password successfully updated'} err={true} />
          )}

          {isPending && (
            <div className="reset-pending">Updating password...</div>
          )}
          <motion.button
            className="reset-page-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleSubmit}
          >
            Reset Password
          </motion.button>
        </div>
      </div>
      <Footer />
    </>
  );
}
