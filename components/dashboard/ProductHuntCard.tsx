export default function ProductHuntCard({
  productHunt,
}: {
  productHunt: any;
}) {
  if (!productHunt) return null;

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-white/40">
            Product Hunt
          </p>

          <h3 className="text-2xl font-semibold mt-2">
            Launch Intelligence
          </h3>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-2xl">
          🚀
        </div>
      </div>

      {/* TAGLINE */}
      <p className="text-white/70 leading-relaxed mb-6">
        {productHunt.tagline}
      </p>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-sm text-white/40">
            Upvotes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {productHunt.votesCount ||
              0}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-sm text-white/40">
            Launch Date
          </p>

          <h2 className="text-lg font-semibold mt-2">
            {productHunt.launchDate ||
              "Unknown"}
          </h2>
        </div>
      </div>

      {/* TOPICS */}
      <div className="flex flex-wrap gap-3">
        {productHunt.topics?.map(
          (topic: string) => (
            <div
              key={topic}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/70"
            >
              {topic}
            </div>
          )
        )}
      </div>
    </div>
  );
}