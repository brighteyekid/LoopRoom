import React, { useEffect, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import MessageList from './MessageList';
import UsersList from './UsersList';
import MessageInput from './MessageInput';
import { useTheme } from '../../context/ThemeContext';
import styled from 'styled-components';

interface ChatRoomProps {
  username: string;
  onLogout: () => Promise<void>;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ username, onLogout }) => {
  const { 
    messages, 
    users, 
    isConnected, 
    connectionStatus, 
    error, 
    reconnect, 
    requestHistory 
  } = useChat();
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await onLogout();
  };

  // Auto-reconnect on connection loss
  useEffect(() => {
    if (connectionStatus === 'disconnected' && !error) {
      const timer = setTimeout(async () => {
        try {
          await reconnect();
          requestHistory();
        } catch (err) {
          console.error('Reconnection failed:', err);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [connectionStatus, error, reconnect, requestHistory]);

  return (
    <Container isExiting={isLoggingOut}>
      <div className={`flex h-screen ${isDark ? 'bg-dark-primary' : 'bg-light-primary'}`}>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className={`text-xl font-bold ${isDark ? 'text-text-primary' : 'text-text-light-primary'}`}>
              Chat Room
            </h1>
            <button 
              onClick={handleLogout}
              className={`px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-dark-accent hover:bg-dark-accent/70' 
                  : 'bg-light-accent hover:bg-light-accent/70'
              }`}
            >
              Logout
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <MessageList messages={messages} currentUser={username} isDark={isDark} />
          </div>
          
          <MessageInput isConnected={isConnected} isDark={isDark} />
        </div>
        
        <UsersList users={users} isDark={isDark} onClose={() => {}} />
      </div>
    </Container>
  );
};

const Container = styled.div<{ isExiting?: boolean }>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.isExiting ? 0 : 1};
`;

export default ChatRoom;