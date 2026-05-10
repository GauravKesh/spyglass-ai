"use client";

import Link from "next/link";

import { useState } from "react";

import ChatPanel from "@/components/chat/ChatPanel";

export default function DashboardContent({
  company,
}: {
  company: any;
}) {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="relative h-full flex overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`mx-auto transition-all duration-300 ${
            chatOpen ? "max-w-6xl" : "max-w-7xl"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* HEADER */}
            <div className="mb-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* COMPANY */}
                <div className="flex items-center gap-5 min-w-0">
                  <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-3xl font-bold shrink-0">
                    {company.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-3xl sm:text-5xl font-bold truncate">
                      {company.title || company.name}
                    </h1>
                    <p className="text-gray-500 mt-2 truncate">
                      {company.url}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-white/60">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Live Intelligence
                  </div>

                  <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 px-5 py-3 transition-all"
                  >
                    <span className="text-sm text-white/70">
                      {chatOpen ? "Hide Analyst" : "Open Analyst"}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      {chatOpen ? "→" : "←"}
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href={`/companies/${company._id}`}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Company Profile
                </Link>

                <Link
                  href={`/companies/${company._id}/upload`}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Upload My Data
                </Link>

                <Link
                  href={`/companies/${company._id}/compare`}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Compare
                </Link>

                <Link
                  href={`/companies/${company._id}/insights`}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Insights
                </Link>
              </div>
            </div>

            {/* DESCRIPTION */}
            {company.description && (
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/3 p-6">
                <h2 className="text-lg font-semibold mb-3 text-white/80">
                  About
                </h2>
                <p className="text-white/60 leading-relaxed">
                  {company.description}
                </p>
              </div>
            )}

            {/* SECTIONS */}
            {company.sections?.length > 0 && (
              <div className="mb-8 flex flex-col gap-6">
                {company.sections.map(
                  (
                    section: { heading: string; content: string },
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/3 p-6"
                    >
                      {section.heading && (
                        <h2 className="text-lg font-semibold mb-3 text-white/80">
                          {section.heading}
                        </h2>
                      )}
                      <p className="text-white/60 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* LINKS */}
            {company.links?.length > 0 && (
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/3 p-6">
                <h2 className="text-lg font-semibold mb-4 text-white/80">
                  Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {company.links.map(
  (
    link: { text: string; url: string },
    i: number
  ) => (
    <a  // ← this was missing
      key={i}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/8 text-sm text-white/70 hover:text-white transition-all"
    >
      {link.text}
    </a>
  )
)}
                </div>
              </div>
            )}

            {/* PAGE TYPE + STATUS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16">
              {company.pageType && (
                <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <h2 className="text-lg font-semibold mb-2 text-white/80">
                    Page Type
                  </h2>
                  <p className="text-white/60 capitalize">
                    {company.pageType}
                  </p>
                </div>
              )}

              {company.status && (
                <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <h2 className="text-lg font-semibold mb-2 text-white/80">
                    Scrape Status
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p className="text-white/60 capitalize">
                      {company.status}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CHAT SIDEBAR */}
      <div
        className={`border-l border-white/10 bg-[#0b0b0b] transition-all duration-300 shrink-0 ${
          chatOpen ? "w-full sm:w-105" : "w-0"
        }`}
      >
        <div
          className={`h-full transition-opacity duration-200 ${
            chatOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* HEADER */}
            <div className="h-20 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-semibold text-lg">AI Analyst</h3>
                <p className="text-sm text-white/40">
                  Strategic insights & reasoning
                </p>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>

            {/* PANEL */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full p-6">
                <ChatPanel companyId={company._id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CHAT BUTTON */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-2xl bg-amber-200 text-black px-5 py-4 font-semibold shadow-2xl hover:bg-amber-100 transition-all lg:hidden"
        >
          Open AI Analyst
        </button>
      )}
    </div>
  );
}