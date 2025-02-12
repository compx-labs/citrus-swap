import { motion } from 'framer-motion';

export const SwapButton: React.FC = () => {
  return (
    <div className="flex w-full mx-auto justify-center">
      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: '#FBBF24', // Example: a slightly different orange
          borderColor: '#4ADE80',     // Example: a bright green for contrast
          transition: { type: 'spring', stiffness: 300, damping: 20 },
          boxShadow: '0px 0px 15px 5px rgba(255, 255, 255, 0.8)',
          
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-lime-300 hover:text-white text-orange-400 text-3xl font-Bari rounded-full px-6 py-2 w-1/2 border-4 border-orange-400 shadow-xl"
      >
        Swap
      </motion.button>
    </div>
  );
};
