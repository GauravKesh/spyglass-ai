export default function SEOCard({
  keywords,
}: {
  keywords: string[];
}) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
      <h2 className="text-2xl mb-4">
        SEO Keywords
      </h2>

      <div className="flex flex-wrap gap-3">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="border border-white/10 bg-white/10 px-4 py-2 rounded-full text-sm text-white/80"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}