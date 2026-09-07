export type ChatRole = 'user' | 'jarvis';

export interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
  timestamp: number;
}

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';
