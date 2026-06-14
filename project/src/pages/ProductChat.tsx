// Full-screen standalone chat assistant page
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Bot } from 'lucide-react';
import  productService  from '../services/productService';
import { chatService } from '../services/chatService';
import MessageBubble from '../components/assistant/MessageBubble';
import { Skeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import type { Product, ChatMessage, SuggestedPrompt } from '../types';

function ProductChat() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompts, setPrompts] = useState<SuggestedPrompt[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load product and suggested prompts
  const fetchData = () => {
    if (!id) return;
    setLoading(true);
    setError(false);
    Promise.all([
      productService.getById(id),
      chatService.getSuggestedPrompts(id),
    ])
      .then(([prod, sps]) => {
        setProduct(prod);
        setPrompts(sps);
        if (prod) {
          setMessages([
            {
              id: `welcome-${Date.now()}`,
              role: 'assistant',
              content: `Hello! I can help diagnose issues related to your ${prod.name}. Describe the problem and I'll reference official documentation to assist you.`,
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Send message to AI backend
  const handleSend = async () => {
    if (!input.trim() || sending || !id) return;
    const content = input.trim();
    setInput('');
    setSending(true);

    // Optimistic user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await chatService.sendMessage(id, content, sessionId);
      const responseData = (res as any).data || res;
      if (!sessionId && responseData.sessionId) setSessionId(responseData.sessionId);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: responseData.content || (res as any).reply || "No response",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            'Unable to connect to the diagnostic engine. Please try again.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Skeleton className="h-[80vh] rounded-3xl" />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <ErrorState
          title="Product not found"
          description="Unable to load the chat assistant."
          onRetry={fetchData}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-6 py-6">
      {/* Chat header bar */}
      <div className="flex items-center justify-between rounded-t-3xl border border-b-0 border-[rgba(96,117,138,0.1)] bg-white px-6 py-5">
        <div className="flex items-center gap-4">
          <Link
            to={`/products/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-[#F3F5F7]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-[13px] text-[#60758A]">AI Diagnostics</p>
            <h2 className="text-[16px] font-semibold text-[#111315]">
              {product.name}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#F3F5F7] px-3 py-1.5 text-[12px] font-medium text-[#60758A]">
          <div className="h-2 w-2 rounded-full bg-[#111315]" />
          {sending ? 'Thinking...' : 'Active'}
        </div>
      </div>

      {/* Messages scroll area */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto border-x border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]/30 px-6 py-6 scrollbar-thin"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} sender={msg.role} message={msg.content} />
        ))}

        {/* Typing indicator */}
        {sending && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F5F7]">
              <Bot className="h-4 w-4 text-[#60758A]" />
            </div>
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#60758A]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#60758A] [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#60758A] [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts strip */}
      {messages.length <= 1 && prompts.length > 0 && (
        <div className="border-x border-[rgba(96,117,138,0.1)] bg-white px-6 py-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[#60758A]">
            Suggested
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => setInput(prompt.text)}
                className="rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 py-2 text-[13px] font-medium text-[#111315] transition hover:bg-[#E6E8EA]"
              >
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message input bar */}
      <div className="rounded-b-3xl border border-t-0 border-[rgba(96,117,138,0.1)] bg-white px-6 py-5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={`Ask about ${product.name}...`}
            className="h-12 flex-1 rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-5 text-[14px] text-[#111315] outline-none transition placeholder:text-[#60758A] focus:border-[#111315]/30"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111315] text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductChat;
