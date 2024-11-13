import { motion } from 'framer-motion';
import { User } from '../../types';
import { FiX } from 'react-icons/fi';

interface UsersListProps {
  users: User[];
  isDark: boolean;
  onClose: () => void;
}

const UsersList = ({ users, isDark, onClose }: UsersListProps) => {
  const onlineUsers = users.filter(user => user.online);
  const offlineUsers = users.filter(user => !user.online);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`w-80 h-full shadow-lg z-30 flex flex-col
        ${isDark ? 'bg-dark-secondary' : 'bg-light-secondary'}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className={`text-lg font-semibold
          ${isDark ? 'text-text-primary' : 'text-text-light-primary'}`}>
          Users ({users.length})
        </h2>
        <button
          onClick={onClose}
          className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors`}
        >
          <FiX className={isDark ? 'text-text-primary' : 'text-text-light-primary'} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Online Users */}
        <div className="mb-4">
          <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-text-light-secondary'}`}>
            Online ({onlineUsers.length})
          </h3>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center space-x-3 p-3 rounded-lg
                  ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}
              >
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className={isDark ? 'text-text-primary' : 'text-text-light-primary'}>
                  {user.displayName || user.username}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Offline Users */}
        <div>
          <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-text-secondary' : 'text-text-light-secondary'}`}>
            Offline ({offlineUsers.length})
          </h3>
          <div className="space-y-2">
            {offlineUsers.map((user) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center space-x-3 p-3 rounded-lg
                  ${isDark ? 'bg-dark-primary/50' : 'bg-light-primary/50'}`}
              >
                <div className="h-2 w-2 rounded-full bg-gray-500" />
                <div className="flex flex-col">
                  <span className={`${isDark ? 'text-text-primary/70' : 'text-text-light-primary/70'}`}>
                    {user.displayName || user.username}
                  </span>
                  {user.lastSeen && (
                    <span className={`text-xs ${isDark ? 'text-text-secondary' : 'text-text-light-secondary'}`}>
                      Last seen: {new Date(user.lastSeen).toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UsersList; 