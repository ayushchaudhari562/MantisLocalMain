// Chat API service with mock fallback
import api from '../api';
import type { ChatMessage, SuggestedPrompt } from '../types';
import { mockChatMessages, mockSuggestedPrompts } from '../mock/chat';

export const chatService = {
  // Send message and receive AI response
  async sendMessage(
    productId: string,
    message: string,
    sessionId?: string | null
  ): Promise<{ reply: string; sessionId: string }> {
    try {
      const res = await api.post('/chat', { productId, message, sessionId });
      return res.data;
    } catch {
      return {
        reply: 'I\'m currently unable to connect to the diagnostic engine. Please check your connection and try again.',
        sessionId: sessionId || null, // DO NOT generate a fake session string, it breaks the backend UUID type!
      };
    }
  },

  // Fetch chat history for a session
  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const res = await api.get(`/chat/sessions/${sessionId}/messages`);
      return res.data;
    } catch {
      return mockChatMessages;
    }
  },

  // Fetch suggested prompts for a product
  async getSuggestedPrompts(productId: string): Promise<SuggestedPrompt[]> {
    try {
      const res = await api.get(`/chat/prompts/${productId}`);
      return res.data;
    } catch {
      void productId;
      return mockSuggestedPrompts;
    }
  },
};
