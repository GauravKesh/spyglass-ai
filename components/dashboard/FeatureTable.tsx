export default function FeatureTable({
  features,
}: {
  features: string[];
}) {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Features
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="border rounded-xl p-4"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}