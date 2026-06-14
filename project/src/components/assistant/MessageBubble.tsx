// components/assistant/MessageBubble.tsx

type MessageBubbleProps = {
  message: string;
  sender: "user" | "assistant";
};

function MessageBubble({
  message,
  sender,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] px-5 py-3 text-[14px] leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-br-sm bg-[#111315] text-white"
            : "rounded-2xl rounded-bl-sm border border-[#60758A]/10 bg-white text-[#111315] shadow-soft-sm"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;
