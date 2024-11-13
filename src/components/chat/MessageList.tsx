import React, { useRef, useEffect } from 'react';
import { Message } from '../../types';
import { generateAvatarColors, generateInitials } from '../../utils/messageUtils';
import ScrollControls from './ScrollControls';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
  isDark: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser, isDark }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (direction: 'up' | 'down', amount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: direction === 'up' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (message: Message) => {
    const isCurrentUser = message.senderUsername === currentUser;
    const [gradientColor] = generateAvatarColors(message.senderUsername);
    const initials = generateInitials(message.senderUsername);

    if (message.type === 'JOIN' || message.type === 'LEAVE') {
      return (
        <div className="flex justify-center my-2">
          <span className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-light-secondary'}`}>
            {message.content}
          </span>
        </div>
      );
    }

    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}>
          {!isCurrentUser && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${gradientColor}`}>
              <span className="text-white text-sm font-medium">{initials}</span>
            </div>
          )}
          
          <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
            {!isCurrentUser && (
              <span className={`text-sm mb-1 ${isDark ? 'text-text-secondary' : 'text-text-light-secondary'}`}>
                {message.senderUsername}
              </span>
            )}
            <div className={`rounded-lg px-4 py-2 break-words ${
              isCurrentUser
                ? 'bg-purple-primary text-white'
                : isDark 
                  ? 'bg-dark-accent text-text-primary'
                  : 'bg-light-accent text-text-light-primary'
            }`}>
              {message.content}
            </div>
            <span className={`text-xs mt-1 ${isDark ? 'text-text-secondary' : 'text-text-light-secondary'}`}>
              {new Date(message.sentAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <ScrollControls 
        onScroll={handleScroll}
        onScrollToBottom={scrollToBottom}
        isDark={isDark}
      />
      
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div key={`${message.uniqueId}-${index}`}>
            {renderMessage(message)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList; 