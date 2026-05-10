export default function ChatMessage({
  role,
  message,
}: {
  role: string;

  message: string;
}) {
  return (
    <div
      className={`p-4 rounded-2xl max-w-2xl ${
        role === "user"
          ? "bg-black text-white ml-auto"
          : "bg-gray-200"
      }`}
    >
      <p>{message}</p>
    </div>
  );
}