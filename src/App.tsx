import React, { useState } from 'react';
import { useChat } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import JoinChat from './components/chat/JoinChat';
import ChatRoom from './components/chat/ChatRoom';
import SplashScreen from './components/common/SplashScreen';
import LogoutTransition from './components/common/LogoutTransition';
import styled from 'styled-components';

const AppContainer = styled.div<{ isExiting?: boolean }>`
  opacity: ${props => props.isExiting ? 0 : 1};
  animation: ${props => props.isExiting ? 'fadeOut' : 'fadeIn'} 0.5s ease-in-out forwards;
  animation-delay: ${props => props.isExiting ? '0s' : '0.5s'};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { currentUsername, connectToChat, disconnect } = useChat();

  const handleJoin = async (username: string) => {
    try {
      await connectToChat(username);
    } catch (err) {
      console.error('Failed to join chat:', err);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await disconnect();
    } catch (err) {
      console.error('Failed to logout:', err);
      localStorage.removeItem('chatUsername');
      window.location.reload();
    }
  };

  const handleLogoutAnimationComplete = () => {
    setIsLoggingOut(false);
  };

  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />;
  }

  return (
    <ThemeProvider>
      <AppContainer isExiting={isLoggingOut}>
        {!currentUsername ? (
          <JoinChat onJoin={handleJoin} />
        ) : (
          <ChatRoom 
            username={currentUsername} 
            onLogout={handleLogout}
          />
        )}
      </AppContainer>
      {isLoggingOut && (
        <LogoutTransition onAnimationComplete={handleLogoutAnimationComplete} />
      )}
    </ThemeProvider>
  );
};

export default App;
