// components/assistant/ChatWindow.tsx

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import { sendChatMessage } from "../../api";

interface ChatWindowProps {
  productId: string;
  productName: string;
}

function ChatWindow({ productId, productName }: ChatWindowProps) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: `Hi! I'm the ${productName} support assistant. Tell me what issue you're facing.` }
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(productId, userMsg, sessionId);
      if (!sessionId && response.data?.sessionId) {
        setSessionId(response.data.sessionId);
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.content }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the AI." }]);
    } finally {
      setIsLoading(false);
    }
  };
return ( <div className="flex h-[760px] flex-col overflow-hidden rounded-[32px] border border-[#E4E7EB] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">


  {/* Header */}
  <div className="flex items-center justify-between border-b border-[#ECEFF3] px-6 py-5">

    <div>

      <p className="text-sm text-[#7A8796]">
        AI Diagnostic Assistant
      </p>

      <h2 className="mt-1 text-xl font-semibold text-[#111315]">
        {productName}
      </h2>

    </div>

    <div className="rounded-full border border-[#D8DCE2] bg-[#F8F9FA] px-3 py-1 text-xs font-medium text-[#5F6772]">

      ACTIVE

    </div>

  </div>

  {/* Chat Messages */}
  <div className="flex-1 space-y-4 overflow-y-auto bg-[#FCFCFB] px-6 py-6">

    {messages.map((msg, idx) => (
      <MessageBubble
        key={idx}
        sender={msg.role}
        message={msg.content}
      />
    ))}
    {isLoading && <div className="text-sm text-gray-500 italic">Thinking...</div>}

  </div>

  {/* Suggested Checks */}
  <div className="border-t border-[#ECEFF3] bg-[#FAFAF9] px-6 py-4">

    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#7A8796]">
      Suggested Checks
    </p>

    <div className="mt-3 flex flex-wrap gap-2">

      <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#3B434C] transition hover:bg-[#F3F4F6]">
        Check Fuse F3
      </button>

      <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#3B434C] transition hover:bg-[#F3F4F6]">
        Inspect Horn Wiring
      </button>

      <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#3B434C] transition hover:bg-[#F3F4F6]">
        Test Battery Voltage
      </button>

    </div>

  </div>

  {/* Input Area */}
  <div className="border-t border-[#ECEFF3] bg-white px-6 py-5">

    <div className="flex items-center gap-3">

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Describe your issue..."
        className="h-14 flex-1 rounded-full border border-[#D8DCE2] bg-[#F8F9FA] px-5 text-sm text-[#111315] outline-none placeholder:text-[#9BA6B2]"
      />

      <button 
        onClick={handleSend}
        disabled={isLoading}
        className="h-14 rounded-full bg-[#111315] px-6 text-sm font-medium text-white transition hover:bg-[#1B1D21] disabled:opacity-50">

        Send

      </button>

    </div>

  </div>

</div>


);
}

export default ChatWindow;
