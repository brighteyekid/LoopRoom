import { Client } from '@stomp/stompjs';

export enum MessageType {
  CHAT = 'CHAT',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE'
}

export interface User {
  id: number;
  username: string;
  online: boolean;
  joinedAt: string;
  displayName?: string;
  lastSeen?: string;
}

export interface Message {
  id?: number;
  content: string;
  senderUsername: string;
  sentAt: string;
  type: MessageType;
  uniqueId: string;
  sender?: User;
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