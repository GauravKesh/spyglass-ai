export default function SWOTCard({
  strengths,
  weaknesses,
}: {
  strengths: string[];

  weaknesses: string[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
        <h2 className="text-xl mb-4">
          Strengths
        </h2>

        <ul className="space-y-2 text-white/70">
          {strengths.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-emerald-200">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
        <h2 className="text-xl mb-4">
          Weaknesses
        </h2>

        <ul className="space-y-2 text-white/70">
          {weaknesses.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-rose-200">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}