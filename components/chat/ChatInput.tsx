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
      className="flex gap-4 mt-4"
    >
      <input
        type="text"
        placeholder="Ask SpyGlass AI..."
        className="flex-1 border p-4 rounded-xl"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <button className="bg-black text-white px-6 rounded-xl">
        Send
      </button>
    </form>
  );
}