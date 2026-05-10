export function cleanMarkdown(
  markdown: string
) {
  return markdown
    .replace(/#+/g, "")
    .replace(/\*/g, "")
    .replace(/\n+/g, " ")
    .trim();
}