import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={`bg-nature-white rounded-premium-sm border border-nature-beige shadow-premium p-6 transition-all duration-300 ${hover ? 'hover:shadow-premium-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
