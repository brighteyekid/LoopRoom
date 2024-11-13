import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiChevronsUp, FiChevronsDown } from 'react-icons/fi';

interface ScrollControlsProps {
  onScroll: (direction: 'up' | 'down', amount: number) => void;
  onScrollToBottom: () => void;
  isDark: boolean;
}

const ScrollControls = ({ onScroll, onScrollToBottom, isDark }: ScrollControlsProps) => {
  const SMALL_STEP = 300;
  const LARGE_STEP = 1000;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50
                 flex flex-col gap-2 p-2 rounded-full
                 ${isDark 
                   ? 'bg-dark-secondary/90' 
                   : 'bg-light-secondary/90'
                 } backdrop-blur-sm shadow-lg
                 border border-purple-500/20`}
    >
      {/* Quick scroll to top */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onScroll('up', LARGE_STEP)}
        className={`p-2.5 rounded-full transition-colors duration-200
          ${isDark 
            ? 'hover:bg-dark-accent/50 active:bg-dark-accent/70' 
            : 'hover:bg-light-accent/50 active:bg-light-accent/70'
          }`}
      >
        <FiChevronsUp className={`h-5 w-5 ${
          isDark ? 'text-text-primary' : 'text-text-light-primary'
        }`} />
      </motion.button>

      {/* Small scroll up */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onScroll('up', SMALL_STEP)}
        className={`p-2.5 rounded-full transition-colors duration-200
          ${isDark 
            ? 'hover:bg-dark-accent/50 active:bg-dark-accent/70' 
            : 'hover:bg-light-accent/50 active:bg-light-accent/70'
          }`}
      >
        <FiArrowUp className={`h-5 w-5 ${
          isDark ? 'text-text-primary' : 'text-text-light-primary'
        }`} />
      </motion.button>

      {/* Small scroll down */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onScroll('down', SMALL_STEP)}
        className={`p-2.5 rounded-full transition-colors duration-200
          ${isDark 
            ? 'hover:bg-dark-accent/50 active:bg-dark-accent/70' 
            : 'hover:bg-light-accent/50 active:bg-light-accent/70'
          }`}
      >
        <FiArrowDown className={`h-5 w-5 ${
          isDark ? 'text-text-primary' : 'text-text-light-primary'
        }`} />
      </motion.button>

      {/* Quick scroll to bottom */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onScrollToBottom}
        className={`p-2.5 rounded-full transition-colors duration-200
          ${isDark 
            ? 'hover:bg-dark-accent/50 active:bg-dark-accent/70' 
            : 'hover:bg-light-accent/50 active:bg-light-accent/70'
          }`}
      >
        <FiChevronsDown className={`h-5 w-5 ${
          isDark ? 'text-text-primary' : 'text-text-light-primary'
        }`} />
      </motion.button>
    </motion.div>
  );
};

export default ScrollControls; 