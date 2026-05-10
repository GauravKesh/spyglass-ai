export default function PositioningCard({
  positioning,
}: {
  positioning: string;
}) {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Positioning
      </h2>

      <p>{positioning}</p>
    </div>
  );
}