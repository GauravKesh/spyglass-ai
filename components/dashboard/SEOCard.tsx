export default function SEOCard({
  keywords,
}: {
  keywords: string[];
}) {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        SEO Keywords
      </h2>

      <div className="flex flex-wrap gap-3">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="bg-gray-200 px-4 py-2 rounded-full"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}