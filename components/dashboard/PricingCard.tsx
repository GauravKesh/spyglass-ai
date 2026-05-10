export default function PricingCard({
  pricing,
}: {
  pricing: string;
}) {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Pricing Strategy
      </h2>

      <p>{pricing}</p>
    </div>
  );
}