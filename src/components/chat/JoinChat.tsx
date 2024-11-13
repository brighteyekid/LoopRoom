import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import { TbInfinity } from 'react-icons/tb';

interface JoinChatProps {
  onJoin: (username: string) => void;
}

const JoinChat = ({ onJoin }: JoinChatProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: ['0%', '100%'],
              y: [i * 20 + '%', (i * 20 + 10) + '%'],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <TbInfinity className={`text-purple-primary text-[${100 + i * 50}px]`} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="bg-dark-secondary/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[420px] 
                      border border-purple-primary/20">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: 360 
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="relative z-10"
                >
                  <TbInfinity className="text-7xl text-purple-primary" />
                </motion.div>
                <div className="absolute inset-0 bg-purple-primary/20 blur-2xl rounded-full" />
              </div>
              <h1 className="text-5xl font-bold text-center mt-4 mb-2 bg-gradient-to-r from-purple-light to-purple-primary 
                           bg-clip-text text-transparent">
                LoopRoom
              </h1>
              <p className="text-text-secondary text-center text-lg">
                Where conversations come full circle
              </p>
            </div>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-text-secondary"
              >
                Choose your username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-accent/50 border-2 border-dark-accent 
                         text-text-primary placeholder-text-secondary/50
                         focus:outline-none focus:border-purple-primary transition-all
                         hover:border-purple-primary/50"
                placeholder="Enter your username"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 
                       bg-gradient-to-r from-purple-primary to-purple-dark
                       text-text-primary py-3 px-4 rounded-xl
                       transition-all font-medium text-lg
                       hover:shadow-lg hover:shadow-purple-primary/25
                       focus:outline-none focus:ring-2 focus:ring-purple-primary/50"
            >
              <FiLogIn className="text-lg" />
              Join Room
            </motion.button>
          </form>

          {/* Additional decorative elements */}
          <div className="mt-6 pt-6 border-t border-dark-accent/30">
            <div className="flex justify-center space-x-4 text-text-secondary/50 text-sm">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Real-time Chat
              </motion.span>
              <span>•</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Secure
              </motion.span>
              <span>•</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                Simple
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinChat;