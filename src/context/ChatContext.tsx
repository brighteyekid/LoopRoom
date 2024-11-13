import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Client, Message as StompMessage } from '@stomp/stompjs';
import { Message, User, ChatContextType, MessageType } from '../types';

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [processedMessageIds] = useState(new Set<string>());

  const handleNewMessage = useCallback((message: StompMessage) => {
    if (processedMessageIds.has(message.body)) {
      return;
    }

    processedMessageIds.add(message.body);

    setMessages(prev => [...prev, JSON.parse(message.body) as Message]);
  }, [processedMessageIds]);

  const requestHistory = useCallback(() => {
    if (client?.connected) {
      client.publish({
        destination: '/app/chat.history'
      });
    }
  }, [client]);

  const connectToChat = useCallback(async (username: string) => {
    if (client) {
      await disconnect();
    }

    try {
      setConnectionStatus('connecting');
      
      const newClient = new Client({
        brokerURL: `ws://${window.location.hostname}:8080/ws/websocket`,
        connectHeaders: { username },
        debug: (str) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(str);
          }
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 25000,
        heartbeatOutgoing: 25000,
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
          setError(`STOMP error: ${frame.body}`);
          setConnectionStatus('error');
        }
      });

      newClient.onConnect = () => {
        console.log('Successfully connected to WebSocket');
        setConnectionStatus('connected');
        setCurrentUsername(username);
        localStorage.setItem('chatUsername', username);

        newClient.subscribe('/topic/public', handleNewMessage);

        newClient.subscribe('/topic/users', (message) => {
          const users = JSON.parse(message.body) as User[];
          setUsers(users);
        });

        newClient.subscribe(`/user/${username}/queue/history`, (message) => {
          const history = JSON.parse(message.body) as Message[];
          setMessages(prevMessages => {
            // Clear existing messages and add history
            const newMessages = [...history];
            // Update processed IDs
            history.forEach(msg => processedMessageIds.add(msg.uniqueId));
            return newMessages;
          });
        });

        newClient.publish({
          destination: '/app/chat.join',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ username })
        });
      };

      newClient.onWebSocketError = (error) => {
        console.error('WebSocket Error:', error);
        setError('WebSocket connection error');
        setConnectionStatus('error');
      };

      await newClient.activate();
      setClient(newClient);

    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setConnectionStatus('error');
    }
  }, [handleNewMessage, processedMessageIds]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('chatUsername');
    if (storedUsername) {
      connectToChat(storedUsername).catch(err => {
        console.error('Failed to reconnect:', err);
        localStorage.removeItem('chatUsername');
      });
    }
  }, [connectToChat]);

  const sendMessage = useCallback((content: string) => {
    if (!client || !currentUsername || !content.trim()) return;

    const message = {
      content: content.trim(),
      senderUsername: currentUsername,
      type: MessageType.CHAT,
      sentAt: new Date().toISOString(),
      uniqueId: `${currentUsername}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    client.publish({
      destination: '/app/chat.send',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(message)
    });
  }, [client, currentUsername]);

  const disconnect = useCallback(async () => {
    if (client) {
      try {
        if (currentUsername && client.connected) {
          client.publish({
            destination: '/app/chat.leave',
            body: currentUsername
          });
        }
        
        await client.deactivate();
        setClient(null);
        setMessages([]);
        setUsers([]);
        setCurrentUsername(null);
        setConnectionStatus('disconnected');
        localStorage.removeItem('chatUsername');
        processedMessageIds.clear();
      } catch (err) {
        console.error('Error during disconnect:', err);
        setClient(null);
        setMessages([]);
        setUsers([]);
        setCurrentUsername(null);
        setConnectionStatus('disconnected');
        localStorage.removeItem('chatUsername');
        processedMessageIds.clear();
      }
    }
  }, [client, currentUsername, processedMessageIds]);

  const reconnect = useCallback(async () => {
    if (currentUsername) {
      try {
        await connectToChat(currentUsername);
        return;
      } catch (err) {
        console.error('Reconnection failed:', err);
        throw err;
      }
    }
  }, [currentUsername, connectToChat]);

  // Add history handler
  const handleHistoryMessage = useCallback((message: StompMessage) => {
    const history = JSON.parse(message.body) as Message[];
    setMessages(history);
  }, []);

  const value = useMemo<ChatContextType>(() => ({
    client,
    messages,
    users,
    error,
    currentUsername,
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    connectToChat,
    sendMessage,
    reconnect,
    disconnect,
    requestHistory,
  }), [
    client,
    messages,
    users,
    error,
    currentUsername,
    connectionStatus,
    connectToChat,
    sendMessage,
    reconnect,
    disconnect,
    requestHistory,
  ]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 