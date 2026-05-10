export default function RecommendationsCard({
  recommendations,
}: {
  recommendations: string[];
}) {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        AI Recommendations
      </h2>

      <ul className="space-y-3">
        {recommendations.map(
          (recommendation) => (
            <li key={recommendation}>
              • {recommendation}
            </li>
          )
        )}
      </ul>
    </div>
  );
}