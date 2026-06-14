// components/assistant/ChatWindow.tsx

import MessageBubble from "./MessageBubble";

type ChatWindowProps = {
  productId: string;
  productName: string;
};

function ChatWindow({
  productId,
  productName,
}: ChatWindowProps) {
  return (

    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#60758A]/10 bg-white shadow-sm">

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

          <div className="h-2 w-2 rounded-full bg-[#111315]"></div>

          Active

        </div>

      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto bg-[#F3F5F7]/30 px-6 py-6">

        <MessageBubble
          sender="user"
          message={`I am having an issue with my ${productName}.`}
        />

        <MessageBubble
          sender="assistant"
          message="Can you describe what issue you are facing?"
        />

        <MessageBubble
          sender="user"
          message="The horn is not working properly."
        />

        <MessageBubble
          sender="assistant"
          message="Does the headlight work when the ignition is on?"
        />

        <MessageBubble
          sender="user"
          message="Yes, headlights are working normally."
        />

        <MessageBubble
          sender="assistant"
          message="Please inspect Fuse F3 (10A) beneath the front panel. It controls the horn relay."
        />

      </div>

      {/* Suggested Actions */}
      <div className="border-t border-[#F3F5F7] bg-white px-6 py-4">

        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#60758A]">
          Suggested Actions
        </p>

        <div className="mt-3 flex flex-wrap gap-2">

          <button className="rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-4 py-2 text-[13px] font-medium text-[#111315] transition hover:bg-[#E6E8EA]">

            Show Fuse Diagram

          </button>

          <button className="rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-4 py-2 text-[13px] font-medium text-[#111315] transition hover:bg-[#E6E8EA]">

            Front Panel Access

          </button>

        </div>

      </div>

      {/* Input Area */}
      <div className="border-t border-[#F3F5F7] bg-white px-6 py-5">

        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder={`Ask something about ${productName}...`}
            className="h-12 flex-1 rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-5 text-[14px] text-[#111315] outline-none transition placeholder:text-[#60758A] focus:border-[#111315]/30"
          />

          <button className="h-12 rounded-xl bg-[#111315] px-6 text-[14px] font-medium text-white transition hover:bg-black/80">

            Send

          </button>

        </div>

      </div>

    </div>

  );
}

export default ChatWindow;