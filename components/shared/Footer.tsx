import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="px-8 py-12 grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div className="space-y-3">
          <p className="text-white">SpyGlass AI</p>
          <p>
            An AI-powered competitor intelligence workspace built for founders,
            analysts, and growth teams.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-white">Product</p>
          <Link href="/dashboard" className="block hover:text-white transition">
            Workspace
          </Link>
          <Link href="/" className="block hover:text-white transition">
            Analyze a startup
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-white">Account</p>
          <Link href="/login" className="block hover:text-white transition">
            Log in
          </Link>
          <Link href="/register" className="block hover:text-white transition">
            Get started
          </Link>
        </div>
      </div>
    </footer>
  );
}
