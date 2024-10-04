import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PopUp = ({ message, err }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-4 right-4 ${
            err ? 'bg-green-600' : 'bg-red-600'
          } text-white p-4 rounded-lg shadow-lg mt-20 z-50`}
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PopUp;
