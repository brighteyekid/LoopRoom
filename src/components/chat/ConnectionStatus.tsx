import { useChat } from '../../context/ChatContext';
import { useState } from 'react';

interface ConnectionStatusProps {
  isDark: boolean;
}

export const ConnectionStatus = ({ isDark }: ConnectionStatusProps) => {
  const { connectionStatus, error, reconnect } = useChat();
  const [isReconnecting, setIsReconnecting] = useState(false);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'disconnected': return 'bg-red-500';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    if (error) return `Error: ${error}`;
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      case 'error': return 'Connection Error';
      default: return 'Unknown Status';
    }
  };

  const handleReconnect = async () => {
    try {
      setIsReconnecting(true);
      await reconnect();
    } catch (err) {
      console.error('Reconnection failed:', err);
      // Error will be shown through the context error state
    } finally {
      setIsReconnecting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
      <span className={`text-sm ${
        isDark ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {getStatusText()}
      </span>
      {(connectionStatus === 'disconnected' || connectionStatus === 'error') && (
        <button
          onClick={handleReconnect}
          disabled={isReconnecting}
          className={`text-sm px-2 py-1 rounded transition-colors ${
            isDark 
              ? 'bg-dark-accent hover:bg-dark-accent/70 text-white' 
              : 'bg-light-accent hover:bg-light-accent/70 text-white'
          } ${isReconnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isReconnecting ? 'Reconnecting...' : 'Reconnect'}
        </button>
      )}
    </div>
  );
}; 