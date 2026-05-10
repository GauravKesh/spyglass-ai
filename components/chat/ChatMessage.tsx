function formatMessage(
  text: string
) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed =
      JSON.parse(cleaned);

    return renderStructuredData(
      parsed
    );
  } catch {
    return renderMarkdownLike(
      cleaned
    );
  }
}

function renderStructuredData(
  data: any
) {
  return (
    <div className="space-y-5">
      {Object.entries(data).map(
        ([key, value]) => (
          <div
            key={key}
            className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            {/* HEADER */}
            <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02]">
              <h4 className="text-xs uppercase tracking-[0.25em] text-white/40 font-medium">
                {key
                  .replace(
                    /([A-Z])/g,
                    " $1"
                  )
                  .replace(
                    /^./,
                    (str) =>
                      str.toUpperCase()
                  )}
              </h4>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {Array.isArray(value) ? (
                <div className="space-y-3">
                  {value.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-200 mt-2 shrink-0" />

                        <p className="text-sm leading-relaxed text-white/80">
                          {String(item)}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : typeof value ===
                  "object" &&
                value !== null ? (
                <div className="space-y-3">
                  {Object.entries(
                    value
                  ).map(
                    ([
                      nestedKey,
                      nestedValue,
                    ]) => (
                      <div
                        key={
                          nestedKey
                        }
                        className="rounded-xl bg-black/20 border border-white/5 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">
                          {
                            nestedKey
                          }
                        </p>

                        <p className="text-sm text-white/80 leading-relaxed">
                          {String(
                            nestedValue
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-white/80">
                  {String(value)}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

function renderMarkdownLike(
  text: string
) {
  const lines =
    text.split("\n");

  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        const trimmed =
          line.trim();

        if (!trimmed)
          return null;

        // H1/H2
        if (
          trimmed.startsWith(
            "##"
          )
        ) {
          return (
            <div
              key={index}
              className="pt-3"
            >
              <h2 className="text-lg font-semibold text-white">
                {trimmed.replace(
                  "##",
                  ""
                )}
              </h2>
            </div>
          );
        }

        // BULLETS
        if (
          trimmed.startsWith(
            "- "
          )
        ) {
          return (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200 mt-2 shrink-0" />

              <p className="text-sm leading-relaxed text-white/80">
                {trimmed.replace(
                  "- ",
                  ""
                )}
              </p>
            </div>
          );
        }

        // NUMBERED LIST
        if (
          /^\d+\./.test(
            trimmed
          )
        ) {
          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
            >
              <div className="text-amber-200 font-medium text-sm mt-0.5">
                {
                  trimmed.match(
                    /^\d+\./
                  )?.[0]
                }
              </div>

              <p className="text-sm leading-relaxed text-white/80">
                {trimmed.replace(
                  /^\d+\.\s*/,
                  ""
                )}
              </p>
            </div>
          );
        }

        // NORMAL PARAGRAPH
        return (
          <p
            key={index}
            className="text-sm sm:text-[15px] leading-7 text-white/85"
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatMessage({
  role,
  message,
}: {
  role: string;

  message: string;
}) {
  const isUser =
    role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[94%] sm:max-w-[88%] rounded-[28px] border overflow-hidden ${
          isUser
            ? "bg-amber-200 text-black border-amber-100"
            : "bg-[#111111] border-white/10"
        }`}
      >
        {/* CONTENT */}
        <div className="px-5 py-4">
          <div
            className={`${
              isUser
                ? "text-black"
                : "text-white"
            }`}
          >
            {formatMessage(
              message
            )}
          </div>
        </div>
      </div>
    </div>
  );
}