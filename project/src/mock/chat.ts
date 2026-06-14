// Mock chat data for demo fallback
import type { ChatMessage, ChatSession, SuggestedPrompt } from '../types';

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content: 'Hello! I can help diagnose issues with your product. Describe the problem and I\'ll reference official documentation to assist you.',
    createdAt: new Date().toISOString(),
    sessionId: 'session-001',
  },
];

export const mockSessions: ChatSession[] = [
  {
    id: 'session-001',
    productId: 'prod-001',
    title: 'Horn not working',
    createdAt: '2024-06-10T14:30:00Z',
    updatedAt: '2024-06-10T15:00:00Z',
    messageCount: 6,
  },
];

export const mockSuggestedPrompts: SuggestedPrompt[] = [
  { id: 'sp-001', text: 'Show fuse diagram', category: 'Electrical' },
  { id: 'sp-002', text: 'How to access front panel', category: 'Maintenance' },
  { id: 'sp-003', text: 'Service schedule recommendation', category: 'Service' },
  { id: 'sp-004', text: 'Common error codes', category: 'Diagnostics' },
];
