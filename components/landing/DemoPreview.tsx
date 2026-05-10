export default function DemoPreview() {
  return (
    <section className="max-w-5xl mx-auto mt-24">
      <div className="border rounded-3xl p-10 bg-[#111111]">
        <h2 className="text-3xl font-bold mb-6">
          AI Market Intelligence
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              SWOT Analysis
            </h3>

            <p className="text-gray-400">
              Understand strengths and
              weaknesses instantly.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              SEO Intelligence
            </h3>

            <p className="text-gray-400">
              Discover keyword
              opportunities.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              AI Analyst
            </h3>

            <p className="text-gray-400">
              Chat with competitor
              intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}