"use client";

import { useState } from "react";

export function useChat(
  companyId: string
) {
  const [messages, setMessages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function sendMessage(
    question: string
  ) {
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: question,
      },
    ]);

    const response = await fetch(
      "/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          companyId,
          question,
        }),
      }
    );

    const data =
      await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        message: data.answer,
      },
    ]);

    setLoading(false);
  }

  return {
    messages,
    loading,
    sendMessage,
  };
}