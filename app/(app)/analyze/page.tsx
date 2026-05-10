import UrlForm from "@/components/landing/UrlForm";

export default function AnalyzePage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* HERO */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <div className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />

            <span className="text-sm text-white/60">
              AI Intelligence Engine
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-5xl">
            Analyze startups with
            AI-powered market
            intelligence
          </h1>

          <p className="text-white/50 text-xl leading-relaxed mt-8 max-w-3xl">
            Crawl websites, extract
            strategic insights, analyze
            positioning, uncover SEO
            opportunities, and chat
            with your AI business
            analyst.
          </p>
        </div>

        {/* URL FORM */}
        <div className="mb-20">
          <UrlForm />
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-xl">
              ✦
            </div>

            <h3 className="text-xl font-semibold mb-3">
              AI Analysis
            </h3>

            <p className="text-white/50 leading-relaxed">
              Understand positioning,
              ICP, pricing strategy,
              strengths, and weaknesses
              instantly.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-xl">
              ⌘
            </div>

            <h3 className="text-xl font-semibold mb-3">
              SEO Intelligence
            </h3>

            <p className="text-white/50 leading-relaxed">
              Discover keyword gaps,
              visibility opportunities,
              and growth signals.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-xl">
              ◈
            </div>

            <h3 className="text-xl font-semibold mb-3">
              SWOT Mapping
            </h3>

            <p className="text-white/50 leading-relaxed">
              Automatically identify
              strengths, weaknesses,
              risks, and positioning
              advantages.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-xl">
              ↗
            </div>

            <h3 className="text-xl font-semibold mb-3">
              AI Analyst
            </h3>

            <p className="text-white/50 leading-relaxed">
              Chat with an AI market
              strategist to explore
              deeper competitor
              insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}