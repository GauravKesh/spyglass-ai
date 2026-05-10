export default function FeatureTable({
  features,
}: {
  features: string[];
}) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
      <h2 className="text-2xl mb-4">
        Features
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="border border-white/10 rounded-xl p-4 bg-white/5 text-white/80"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}