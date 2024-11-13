import { Client } from '@stomp/stompjs';

export interface Message {
  id?: number;
  content: string;
  senderUsername: string;
  type: MessageType;
  sentAt: string;
  uniqueId: string;// Add this field
  sender?: User;
}

export interface User {
  id: number;
  username: string;
  online: boolean;
  joinedAt: string;
  displayName?: string;
  lastSeen?: string;
}

export enum MessageType {
  CHAT = 'CHAT',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE'
}

export interface ChatContextType {
  client: Client | null;
  messages: Message[];
  users: User[];
  error: string | null;
  currentUsername: string | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  isConnected: boolean;
  connectToChat: (username: string) => Promise<void>;
  sendMessage: (content: string) => void;
  reconnect: () => Promise<void>;
  disconnect: () => Promise<void>;
  requestHistory: () => void;
} 