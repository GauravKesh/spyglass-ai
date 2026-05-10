export default function Loader({
  text = "Loading intelligence...",
}: {
  text?: string;
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="relative">
        {/* GLOW */}
        <div className="absolute inset-0 blur-3xl opacity-30 bg-white/10 rounded-full" />

        {/* CONTENT */}
        <div className="relative flex flex-col items-center">
          {/* SPINNER */}
          <div className="relative w-20 h-20">
            {/* OUTER RING */}
            <div className="absolute inset-0 rounded-full border border-white/10" />

            {/* ANIMATED RING */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-200 border-r-amber-100 animate-spin" />

            {/* INNER */}
            <div className="absolute inset-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            </div>
          </div>

          {/* TEXT */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-white">
              {text}
            </h3>

            <p className="text-sm text-white/40 mt-2">
              AI is analyzing market intelligence
            </p>
          </div>

          {/* LOADING DOTS */}
          <div className="flex items-center gap-2 mt-5">
            <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" />
            <div
              className="w-2 h-2 rounded-full bg-white/30 animate-bounce"
              style={{
                animationDelay: "0.15s",
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-white/30 animate-bounce"
              style={{
                animationDelay: "0.3s",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}