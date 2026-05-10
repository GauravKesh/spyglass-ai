export default function PositioningCard({
  positioning,
}: {
  positioning: string;
}) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
      <h2 className="text-2xl mb-4">
        Positioning
      </h2>

      <p className="text-white/70 leading-relaxed">{positioning}</p>
    </div>
  );
}