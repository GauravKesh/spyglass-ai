export default function SWOTCard({
  strengths,
  weaknesses,
}: {
  strengths: string[];

  weaknesses: string[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Strengths
        </h2>

        <ul className="space-y-2">
          {strengths.map((item) => (
            <li key={item}>
              • {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Weaknesses
        </h2>

        <ul className="space-y-2">
          {weaknesses.map((item) => (
            <li key={item}>
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}