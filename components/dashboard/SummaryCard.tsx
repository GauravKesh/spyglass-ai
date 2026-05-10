export default function SummaryCard({
  summary,
}: {
  summary: string;
}) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
      <h2 className="text-2xl mb-4">
        Summary
      </h2>

      <p className="text-white/70 leading-relaxed">{summary}</p>
    </div>
  );
}