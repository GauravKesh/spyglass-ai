"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },

  {
    name: "Analyze Startup",
    href: "/analyze",
  },

  {
    name: "Companies",
    href: "/companies",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const companyMatch = pathname.match(
    /^\/(dashboard|companies)\/([^/]+)/
  );

  const activeCompanyId =
    companyMatch?.[2] || null;

  return (
    <div className="h-full flex flex-col justify-between p-6">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="mb-14">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold">
              S
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">SpyGlass AI</h1>

              <p className="text-sm text-gray-500">Market Intelligence</p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(
                `${link.href}/`
              );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {activeCompanyId && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-3">
            <p className="px-2 pb-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
              Company Actions
            </p>

            <nav className="space-y-1">
              {[
                {
                  name: "Overview",
                  href: `/companies/${activeCompanyId}`,
                },
                {
                  name: "Upload My Data",
                  href: `/companies/${activeCompanyId}/upload`,
                },
                {
                  name: "Compare",
                  href: `/companies/${activeCompanyId}/compare`,
                },
                {
                  name: "Insights",
                  href: `/companies/${activeCompanyId}/insights`,
                },
              ].map((link) => {
                const isActive =
                  pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-white text-black font-medium"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-6">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              ✦
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate">AI Analyst</h3>

              <p className="text-xs text-gray-500">Competitor intelligence</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Analyze startups, track positioning, and chat with your AI business
            analyst.
          </p>
        </div>
      </div>
    </div>
  );
}
