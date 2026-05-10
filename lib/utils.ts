export function safeJSONParse(
  text: string
) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}