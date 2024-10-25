import React from 'react';
import { motion } from 'framer-motion';

const CircularLoader = () => {
  return (
      <motion.div
        className="w-[1.5rem] h-[1.5rem] border-2 border-t-transparent border-black rounded-full absolute right-4 top-4"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
  );
};

export default CircularLoader;
