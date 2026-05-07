import { motion } from 'framer-motion';

const variations = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      variants={variations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`page-transition-wrapper ${className}`}
    >
      {children}
    </motion.div>
  );
}
