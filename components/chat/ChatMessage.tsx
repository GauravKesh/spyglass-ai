type MessageBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "code";
      content: string;
      language: string;
    };

type JsonLike =
  | null
  | string
  | number
  | boolean
  | JsonLike[]
  | { [key: string]: JsonLike };

function prettifyKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (char) =>
      char.toUpperCase()
    )
    .trim();
}

function tryParseJson(
  input: string
): JsonLike | null {
  const cleaned = input.trim();

  if (!cleaned) return null;

  try {
    return JSON.parse(cleaned) as JsonLike;
  } catch {
    return null;
  }
}

function splitBlocks(text: string) {
  const blocks: MessageBlock[] = [];
  const regex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const content = text
        .slice(lastIndex, match.index)
        .trim();

      if (content) {
        blocks.push({
          type: "text",
          content,
        });
      }
    }

    blocks.push({
      type: "code",
      language: (
        match[1] || "text"
      ).toLowerCase(),
      content: (match[2] || "").trim(),
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const content = text
      .slice(lastIndex)
      .trim();

    if (content) {
      blocks.push({
        type: "text",
        content,
      });
    }
  }

  if (!blocks.length) {
    blocks.push({
      type: "text",
      content: text.trim(),
    });
  }

  return blocks;
}

function renderInlineText(text: string) {
  const parts = text.split(
    /(https?:\/\/[^\s]+)/g
  );

  return parts.map(
    (part, index) => {
      if (/^https?:\/\//.test(part)) {
        return (
          <a
            key={`link-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/40 hover:decoration-white"
          >
            {part}
          </a>
        );
      }

      return (
        <span
          key={`text-${index}`}
        >
          {part}
        </span>
      );
    }
  );
}

function renderValue(
  value: JsonLike,
  depth = 0,
  nodeKey = "root"
): JSX.Element {
  if (
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number"
  ) {
    return (
      <p className="text-sm leading-relaxed text-white/80 wrap-break-word">
        {String(value)}
      </p>
    );
  }

  if (typeof value === "string") {
    const parsedInner = tryParseJson(
      value
    );

    if (
      parsedInner !== null &&
      parsedInner !== value
    ) {
      return renderValue(
        parsedInner,
        depth + 1,
        `${nodeKey}-string-json`
      );
    }

    if (value.includes("\n")) {
      return renderMarkdownLike(
        value
      );
    }

    return (
      <p className="text-sm leading-relaxed text-white/80 wrap-break-word">
        {renderInlineText(value)}
      </p>
    );
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return (
        <p className="text-sm text-white/50">
          Empty list
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div
            key={`${nodeKey}-${index}`}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200 mt-2 shrink-0" />
              <div className="flex-1">
                {renderValue(
                  item,
                  depth + 1,
                  `${nodeKey}-${index}`
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const entries = Object.entries(
    value
  );

  if (!entries.length) {
    return (
      <p className="text-sm text-white/50">
        Empty object
      </p>
    );
  }

  return (
    <div
      className={
        depth === 0
          ? "space-y-5"
          : "space-y-3"
      }
    >
      {entries.map(
        ([key, nestedValue]) => (
          <div
            key={`${nodeKey}-${key}`}
            className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-white/10 bg-white/2">
              <h4 className="text-xs uppercase tracking-[0.25em] text-white/40 font-medium">
                {prettifyKey(key)}
              </h4>
            </div>

            <div className="p-5">
              {renderValue(
                nestedValue,
                depth + 1,
                `${nodeKey}-${key}`
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

function renderCodeBlock(
  language: string,
  content: string,
  key: string
) {
  return (
    <div
      key={key}
      className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden"
    >
      <div className="px-4 py-2 border-b border-white/10 text-[11px] uppercase tracking-[0.2em] text-white/50">
        {language}
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed text-white/85">
        <code>{content}</code>
      </pre>
    </div>
  );
}

function renderMarkdownLike(
  text: string
) {
  const lines = text.split("\n");

  return (
    <div className="space-y-3">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return null;
        }

        if (/^#{1,3}\s/.test(trimmed)) {
          const level =
            trimmed.match(/^#+/)?.[0]
              .length || 1;
          const headingText = trimmed.replace(
            /^#{1,3}\s*/,
            ""
          );

          if (level === 1) {
            return (
              <h2
                key={index}
                className="text-xl font-semibold text-white pt-2"
              >
                {headingText}
              </h2>
            );
          }

          return (
            <h3
              key={index}
              className="text-lg font-semibold text-white/95 pt-1"
            >
              {headingText}
            </h3>
          );
        }

        if (
          /^[-*]\s+/.test(trimmed)
        ) {
          return (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-white/2 border border-white/5 px-4 py-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200 mt-2 shrink-0" />
              <p className="text-sm leading-relaxed text-white/80">
                {renderInlineText(
                  trimmed.replace(
                    /^[-*]\s+/,
                    ""
                  )
                )}
              </p>
            </div>
          );
        }

        if (
          /^\d+[.)]\s+/.test(trimmed)
        ) {
          const marker =
            trimmed.match(
              /^\d+[.)]/
            )?.[0] || "1.";

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/2 px-4 py-3"
            >
              <div className="text-amber-200 font-medium text-sm mt-0.5">
                {marker}
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                {renderInlineText(
                  trimmed.replace(
                    /^\d+[.)]\s*/,
                    ""
                  )
                )}
              </p>
            </div>
          );
        }

        if (trimmed.startsWith(">")) {
          return (
            <div
              key={index}
              className="rounded-xl border-l-2 border-amber-200 bg-white/2 px-4 py-3"
            >
              <p className="text-sm leading-relaxed text-white/80">
                {renderInlineText(
                  trimmed.replace(
                    /^>\s?/,
                    ""
                  )
                )}
              </p>
            </div>
          );
        }

        if (
          trimmed.includes("|") &&
          trimmed.split("|").length >= 3
        ) {
          return (
            <p
              key={index}
              className="font-mono text-xs sm:text-sm text-white/75 wrap-break-word"
            >
              {trimmed}
            </p>
          );
        }

        return (
          <p
            key={index}
            className="text-sm sm:text-[15px] leading-7 text-white/85 wrap-break-word"
          >
            {renderInlineText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function formatMessage(
  text: string
) {
  const safeText =
    typeof text === "string"
      ? text
      : String(text ?? "");

  if (!safeText.trim()) {
    return (
      <p className="text-sm text-white/50">
        No content
      </p>
    );
  }

  const wholeJson = tryParseJson(
    safeText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
  );

  if (wholeJson !== null) {
    return renderValue(wholeJson);
  }

  const blocks = splitBlocks(
    safeText
  );

  return (
    <div className="space-y-4">
      {blocks.map(
        (block, index) => {
          if (block.type === "text") {
            const parsedText =
              tryParseJson(
                block.content
              );

            if (
              parsedText !== null
            ) {
              return (
                <div
                  key={`json-${index}`}
                >
                  {renderValue(
                    parsedText,
                    0,
                    `block-${index}`
                  )}
                </div>
              );
            }

            return (
              <div
                key={`text-${index}`}
              >
                {renderMarkdownLike(
                  block.content
                )}
              </div>
            );
          }

          if (
            block.language === "json"
          ) {
            const parsedCode =
              tryParseJson(
                block.content
              );

            if (
              parsedCode !== null
            ) {
              return (
                <div
                  key={`code-json-${index}`}
                >
                  {renderValue(
                    parsedCode,
                    0,
                    `code-${index}`
                  )}
                </div>
              );
            }
          }

          return renderCodeBlock(
            block.language,
            block.content,
            `code-${index}`
          );
        }
      )}
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
            {isUser ? (
              <p className="text-sm sm:text-[15px] leading-7 wrap-break-word">
                {message}
              </p>
            ) : (
              formatMessage(
                message
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}