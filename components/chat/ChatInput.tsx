"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (
    question: string
  ) => void;
}) {
  const [question, setQuestion] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 pt-4 bg-[#0d0d0d]"
    >
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* INPUT */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask SpyGlass AI about pricing, SEO, strategy..."
              className="w-full h-14 rounded-2xl border border-white/10 bg-black/30 px-5 pr-12 text-white placeholder:text-white/30 outline-none focus:border-amber-200/40 focus:ring-4 focus:ring-amber-200/10 transition-all"
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
              ✦
            </div>
          </div>

          {/* BUTTON */}
          <button className="h-14 px-6 rounded-2xl bg-amber-200 text-black font-semibold hover:bg-amber-100 transition-all duration-200 whitespace-nowrap">
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
}