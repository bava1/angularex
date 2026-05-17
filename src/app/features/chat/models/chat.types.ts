export type ChatMessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;
}

export interface ChatRequestBody {
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>;
}

export interface ChatGatewayResponse {
  answer?: string;
  message?: string;
  content?: string;
  text?: string;
  errorCode?: string;
}

