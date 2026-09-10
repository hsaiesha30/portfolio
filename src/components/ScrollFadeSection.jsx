import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollFadeSection = ({ children, className = "" }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px -50% 0px', // Trigger when section is 50% from bottom
    triggerOnce: false,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Smooth easing curve
        opacity: { duration: 0.5 },
        y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.6 }
      }
    },
    exit: {
      opacity: 0.1,
      y: -20,
      scale: 0.99,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`section-container ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "exit"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeSection;