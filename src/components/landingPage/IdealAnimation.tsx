// AnimatedCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaBookMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const AnimatedCard = ({ initialScale, hoverScale, tapScale, icon, text }:{ initialScale: number, hoverScale: number, tapScale: number, icon: number, text: string }) => {
    const cardVariants = {
        initial: {
          scale: initialScale,
          opacity: 0.8,
        },
        hover: {
          scale: hoverScale,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        },
        tap: {
          scale: tapScale,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        },
      };
      


  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '20px',
      }}
    >
      <div className='text-4xl flex text-center flex-col text-black'>
        {icon === 0 ? <MdAdminPanelSettings /> : ( icon === 1 ? <FaBookMedical /> : <FaUserDoctor />)}
        <span className='text-sm'>
        </span>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
