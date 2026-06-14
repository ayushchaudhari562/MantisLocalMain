// components/assistant/MessageBubble.tsx

type MessageBubbleProps = {
  message: string;
  sender: "user" | "assistant";
  onOptionClick?: (option: string) => void;
};

function MessageBubble({
  message,
  sender,
  onOptionClick
}: MessageBubbleProps) {
  const isUser = sender === "user";

  // Parse options from the message
  const lines = message.split('\n');
  const textLines: string[] = [];
  const options: string[] = [];

  lines.forEach(line => {
    if (line.trim().startsWith('[OPTION]')) {
      options.push(line.replace('[OPTION]', '').trim());
    } else {
      textLines.push(line);
    }
  });

  const cleanMessage = textLines.join('\n').trim();

  return (
    <div className={`flex flex-col mb-4 ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
          isUser
            ? "rounded-br-md bg-[#111315] text-white"
            : "rounded-bl-md border border-[#E4E7EB] bg-[#F8F9FA] text-[#3B434C]"
        }`}
      >
        {cleanMessage}
      </div>

      {!isUser && options.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 max-w-[85%]">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onOptionClick && onOptionClick(opt)}
              className="rounded-full border border-[#D8DCE2] bg-white px-4 py-1.5 text-xs font-medium text-[#3B434C] transition hover:bg-[#F3F4F6] hover:border-[#C4C8D0] shadow-sm text-left"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
