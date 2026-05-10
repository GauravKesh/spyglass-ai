export default function RecommendationsCard({
  recommendations,
}: {
  recommendations: string[];
}) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
      <h2 className="text-2xl mb-4">
        AI Recommendations
      </h2>

      <ul className="space-y-3 text-white/70">
        {recommendations.map((recommendation) => (
          <li key={recommendation} className="flex gap-2">
            <span className="text-amber-200">•</span>
            <span>{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}