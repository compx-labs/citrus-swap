import { motion } from 'framer-motion'
import React from 'react'

interface AnimButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const AnimButton: React.FC<AnimButtonProps> = ({ onClick, children }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: '#FBBF24', // Example: a slightly different orange
        borderColor: '#4ADE80', // Example: a bright green for contrast
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-lime-300 hover:text-white text-orange-400 text-3xl font-barriecito rounded-full px-6 py-2 w-1/2 border-4 border-orange-400 shadow-xl"
    >
      {children}
    </motion.button>
  )
}

export default AnimButton
