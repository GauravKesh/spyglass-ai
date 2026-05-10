export default function ChatMessage({
  role,
  message,
}: {
  role: string;

  message: string;
}) {
  const isUser =
    role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[92%] sm:max-w-[85%] rounded-[24px] px-5 py-4 border ${
          isUser
            ? "bg-amber-200 text-black border-amber-100"
            : "bg-white/[0.04] text-white border-white/10"
        }`}
      >
        {/* ROLE */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              isUser
                ? "bg-black/10"
                : "bg-white/10"
            }`}
          >
            {isUser ? "Y" : "AI"}
          </div>

          <span
            className={`text-xs uppercase tracking-[0.2em] ${
              isUser
                ? "text-black/60"
                : "text-white/40"
            }`}
          >
            {isUser
              ? "You"
              : "SpyGlass AI"}
          </span>
        </div>

        {/* MESSAGE */}
        <p className="leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words">
          {message}
        </p>
      </div>
    </div>
  );
}