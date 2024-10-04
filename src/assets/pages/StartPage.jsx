import { motion, useScroll, useTransform } from 'framer-motion';

export default function StartPage() {
      const { scrollY } = useScroll();

      const texty = useTransform(
        scrollY,
        [0, 100, 200, 300, 350],
        [0, 55, 110, 170, 200]
      );
      const scaley = useTransform(
        scrollY,
        [0, 100, 200, 300],
        [1, 1.01, 1.02, 1.03]
      );
      const opacy = useTransform(scrollY, [0, 100, 200, 300], [1, 0.7, 0.4, 0]);

  return (
    <div className="intro">
      <div className='intro-box z-10'>
      <motion.h1
        className='intro-h1 z-20'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
          style={{ color: 'white', y: texty, scale: scaley, opacity: opacy }}
      >
        Book Your Dream Adventure Today!
      </motion.h1>
      <motion.h2
      className='intro-h2 z-50  '
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ color: 'white', y: texty, scale: scaley, opacity: opacy }}>
      Browse a wide range of tour options, enjoy easy online booking, and make memories that last a lifetime.
      </motion.h2>
      </div>
    <motion.img style={{ color: 'white', x: texty, scale: scaley, opacity: opacy }} className='startpage-img' src="./startpageimg.png" alt="" />

    </div>
  );
}
