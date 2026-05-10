export default function SummaryCard({
  summary,
}: {
  summary: string;
}) {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Summary
      </h2>

      <p>{summary}</p>
    </div>
  );
}