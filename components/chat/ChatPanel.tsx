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
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="mb-6 shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
              Analyst
            </p>

            <h2 className="text-2xl font-semibold">
              AI Market Analyst
            </h2>

            <p className="text-sm text-white/40 mt-2">
              Ask strategic questions
              about positioning,
              pricing, SEO, and growth.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            Live reasoning
          </div>
        </div>
      </div>

      {/* PROMPTS */}
      <div className="mb-6 shrink-0">
        <SuggestedPrompts
          onSelect={sendMessage}
        />
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-5 text-2xl">
              ✦
            </div>

            <h3 className="text-lg font-semibold mb-3">
              Start a conversation
            </h3>

            <p className="text-white/40 max-w-sm mx-auto leading-relaxed">
              Ask about competitor
              strategy, SEO gaps,
              positioning, pricing, or
              growth opportunities.
            </p>
          </div>
        )}

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

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-3 text-white/50 px-2">
            <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" />
            <div
              className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
              style={{
                animationDelay:
                  "0.15s",
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
              style={{
                animationDelay:
                  "0.3s",
              }}
            />

            <span className="text-sm ml-2">
              Thinking...
            </span>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="pt-6 shrink-0">
        <ChatInput
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}