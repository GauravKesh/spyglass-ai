export default function DemoPreview() {
  return (
    <section className="max-w-6xl mx-auto mt-24">
      <div className="border border-white/10 rounded-4xl p-8 md:p-12 bg-linear-to-br from-white/10 via-white/5 to-white/0 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Product preview
            </p>
            <h2 className="text-3xl md:text-4xl mt-3">
              Inside the intelligence workspace
            </h2>
          </div>
          <p className="text-white/60 max-w-sm">
            All the essential signals in one narrative-ready deck.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "SWOT Brief",
              copy: "Instant strengths, gaps, and blind spots in one scan.",
            },
            {
              title: "SEO Signal",
              copy: "Find keyword momentum before the market does.",
            },
            {
              title: "AI Analyst",
              copy: "Ask sharper questions and get decision-ready answers.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="border border-white/10 rounded-2xl p-6 bg-white/5"
            >
              <h3 className="text-xl mb-2">{card.title}</h3>
              <p className="text-white/60">{card.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}