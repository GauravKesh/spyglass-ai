"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import LogoutButton from "@/components/auth/LogoutButton";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar({
  mode = "app",
}: {
  mode?: "app" | "marketing";
}) {
  const pathname = usePathname();

  const { user } = useAuth();

  const isDashboard =
    pathname === "/dashboard";

  const isAnalyze =
    pathname === "/analyze";

  return (
    <div className="h-full px-8 flex items-center justify-between">
      {/* LEFT */}
      {mode === "marketing" ? (
        <Link
          href="/"
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold">
            S
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              SpyGlass AI
            </h1>

            <p className="text-sm text-gray-500">
              Market Intelligence
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-3 text-sm text-white/40">
            <span>
              SpyGlass
            </span>

            <span>/</span>

            <span className="text-white/80">
              {isDashboard
                ? "Dashboard"
                : isAnalyze
                ? "Analyze"
                : "Intelligence"}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold mt-1">
            {isDashboard
              ? "Your Intelligence Workspace"
              : isAnalyze
              ? "Analyze Startup"
              : "Company Intelligence"}
          </h1>
        </div>
      )}

      {/* RIGHT */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* STATUS */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-white/70">
              AI Analyst Active
            </span>
          </div>

          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-white/60 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-2xl bg-white text-black hover:bg-white/90 transition"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}