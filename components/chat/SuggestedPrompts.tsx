const prompts = [
  "Analyze pricing strategy",
  "Find SEO weaknesses",
  "Roast landing page",
  "Compare positioning",
];

export default function SuggestedPrompts({
  onSelect,
}: {
  onSelect: (
    prompt: string
  ) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() =>
            onSelect(prompt)
          }
          className="border px-4 py-2 rounded-full"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}