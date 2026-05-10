"use client";

const prompts = [
  "Analyze pricing strategy",
  "Find SEO weaknesses",
  "Roast landing page",
  "Compare positioning",
  "Who is the target audience?",
  "What are the growth opportunities?",
];

export default function SuggestedPrompts({
  onSelect,
}: {
  onSelect: (
    prompt: string
  ) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() =>
            onSelect(prompt)
          }
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}