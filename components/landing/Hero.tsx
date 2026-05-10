export default function Hero() {
  return (
    <section className="pt-20 pb-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Competitor intelligence
          </p>
          <h1 className="text-5xl md:text-7xl leading-[1.05]">
            Your market story,
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-white to-sky-200">
              distilled into action.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl">
            SpyGlass AI turns noisy competitor data into crisp positioning,
            pricing cues, and narrative edges you can ship this week.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Live site parsing",
              "Pricing intelligence",
              "AI analyst chat",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="border border-white/10 bg-white/5 rounded-3xl p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Live signal
          </p>
          <h2 className="text-3xl mt-4 mb-6">
            Market pulse index
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Messaging clarity",
                value: "92",
                barClass: "w-[92%]",
              },
              {
                label: "Pricing leverage",
                value: "78",
                barClass: "w-[78%]",
              },
              {
                label: "SEO momentum",
                value: "84",
                barClass: "w-[84%]",
              },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>{metric.label}</span>
                  <span className="text-white">{metric.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div
                    className={`h-1.5 rounded-full bg-linear-to-r from-amber-200 to-sky-200 ${metric.barClass}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}