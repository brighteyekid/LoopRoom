import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';

interface MessageInputProps {
  isConnected: boolean;
  isDark: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ isConnected, isDark }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendMessage } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!isConnected) {
      setError('Cannot send message: Not connected');
      return;
    }

    try {
      setSending(true);
      await sendMessage(message);
      setMessage('');
      setError(null);
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      {error && (
        <div className="text-red-500 mb-2 text-sm">
          {error}
        </div>
      )}
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isConnected 
              ? "Type a message..." 
              : "Connecting..."
          }
          disabled={sending || !isConnected}
          className={`flex-1 p-2 rounded-lg ${
            isDark 
              ? 'bg-dark-secondary text-text-primary' 
              : 'bg-light-secondary text-text-light-primary'
          } ${
            !isConnected ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        <button
          type="submit"
          disabled={sending || !message.trim() || !isConnected}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isDark 
              ? 'bg-dark-accent hover:bg-dark-accent/70' 
              : 'bg-light-accent hover:bg-light-accent/70'
          } ${
            (sending || !isConnected) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default MessageInput; 