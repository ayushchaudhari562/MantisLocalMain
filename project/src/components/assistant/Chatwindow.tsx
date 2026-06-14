// Embedded chat assistant panel for product detail page

import { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';

import { chatService } from '../../services/chatService';

import MessageBubble from './MessageBubble';

import type {
  ChatMessage,
  SuggestedPrompt,
} from '../../types';

interface ChatWindowProps {
  productId: string;
  productName: string;
}

function ChatWindow({
  productId,
  productName,
}: ChatWindowProps) {

  // Input field state
  const [input, setInput] = useState('');

  // AI loading state
  const [loading, setLoading] = useState(false);

  // Active chat session UUID
  const [sessionId, setSessionId] =
    useState<string | null>(null);

  // Suggested prompts state
  const [prompts, setPrompts] =
    useState<SuggestedPrompt[]>([]);

  // Scroll container ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // Chat message state
  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Hello! I can help diagnose issues related to your ${productName}.`,
        createdAt: new Date().toISOString(),
      },
    ]);

  // Load suggested prompts
  useEffect(() => {

    const loadPrompts = async () => {
      try {

        const data =
          await chatService.getSuggestedPrompts(
            productId
          );

        setPrompts(data);

      } catch (error) {

        console.error(
          'Failed to load prompts',
          error
        );

      }
    };

    loadPrompts();

  }, [productId]);

  // Auto scroll on new messages
  useEffect(() => {

    if (scrollRef.current) {

      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });

    }

  }, [messages]);

  // Send chat message
  const handleSend = async () => {

    if (!input.trim() || loading) return;

    const content = input.trim();

    // Clear input instantly
    setInput('');

    // Enable loading
    setLoading(true);

    // Add optimistic user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      // Send message to backend
      const response =
        await chatService.sendMessage(
          productId,
          content,
          sessionId
        );

      // Save real UUID session from backend
      if (!sessionId && response.sessionId) {

        setSessionId(response.sessionId);

      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          response.reply ||
          'No response generated.',
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

    } catch (error) {

      console.error(
        'Chat send error',
        error
      );

      // Show graceful error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'Unable to connect to the AI assistant right now.',
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {

      // Disable loading
      setLoading(false);

    }

  };

  return (

    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white shadow-soft-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F3F5F7] px-6 py-5">

        <div>

          <p className="text-[13px] font-medium text-[#60758A]">
            Diagnostics
          </p>

          <h2 className="text-[15px] font-semibold text-[#111315]">
            {productName} Assistant
          </h2>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-[#F3F5F7] px-3 py-1.5 text-[12px] font-medium text-[#60758A]">

          <div className="h-2 w-2 rounded-full bg-[#111315]" />

          {loading ? 'Thinking...' : 'Active'}

        </div>

      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto bg-[#F3F5F7]/30 px-6 py-6"
      >

        {messages.map((message) => (

          <MessageBubble
            key={message.id}
            sender={message.role}
            message={message.content}
          />

        ))}

        {/* Typing indicator */}
        {loading && (

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F5F7]">

              <Bot className="h-4 w-4 text-[#60758A]" />

            </div>

            <div className="flex gap-1">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60758A]" />

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60758A] [animation-delay:150ms]" />

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60758A] [animation-delay:300ms]" />

            </div>

          </div>

        )}

      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 &&
        prompts.length > 0 && (

        <div className="border-t border-[#F3F5F7] bg-white px-6 py-4">

          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#60758A]">
            Suggested
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            {prompts.map((prompt) => (

              <button
                key={prompt.id}
                onClick={() =>
                  setInput(prompt.text)
                }
                className="rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 py-2 text-[13px] font-medium text-[#111315] transition hover:bg-[#E6E8EA]"
              >

                {prompt.text}

              </button>

            ))}

          </div>

        </div>

      )}

      {/* Input */}
      <div className="border-t border-[#F3F5F7] bg-white px-6 py-5">

        <div className="flex items-center gap-3">

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === 'Enter') {

                handleSend();

              }

            }}
            placeholder={`Ask something about ${productName}...`}
            className="h-12 flex-1 rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-5 text-[14px] text-[#111315] outline-none transition placeholder:text-[#60758A] focus:border-[#111315]/30"
          />

          <button
            onClick={handleSend}
            disabled={
              loading || !input.trim()
            }
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111315] text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Send className="h-[18px] w-[18px]" />

          </button>

        </div>

      </div>

    </div>

  );

}

export default ChatWindow;