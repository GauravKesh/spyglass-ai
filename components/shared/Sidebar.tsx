import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">
        SpyGlass
      </h1>

      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          href="/"
          className="block"
        >
          Analyze Startup
        </Link>
      </div>
    </aside>
  );
}