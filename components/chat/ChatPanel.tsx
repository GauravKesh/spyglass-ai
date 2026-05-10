"use client";

import ChatInput from "./ChatInput";

import ChatMessage from "./ChatMessage";

import SuggestedPrompts from "./SuggestedPrompts";

import { useChat } from "@/hooks/useChat";

export default function ChatPanel({
  companyId,
}: {
  companyId: string;
}) {
  const {
    messages,
    sendMessage,
    loading,
  } = useChat(companyId);

  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        AI Analyst
      </h2>

      <SuggestedPrompts
        onSelect={sendMessage}
      />

      <div className="space-y-4 min-h-[300px]">
        {messages.map(
          (message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              message={
                message.message
              }
            />
          )
        )}

        {loading && (
          <p>Thinking...</p>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
      />
    </div>
  );
}