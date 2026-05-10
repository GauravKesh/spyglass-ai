"use client";

import { useState } from "react";

import SummaryCard from "./SummaryCard";

import SWOTCard from "./SWOTCard";

import FeatureTable from "./FeatureTable";

import SEOCard from "./SEOCard";

import PricingCard from "./PricingCard";

import PositioningCard from "./PositioningCard";

import RecommendationsCard from "./RecommendationsCard";

import ProductHuntCard from "./ProductHuntCard";

import ChatPanel from "@/components/chat/ChatPanel";

export default function DashboardContent({
  company,
}: {
  company: any;
}) {
  const [chatOpen, setChatOpen] =
    useState(true);

  return (
    <div className="relative h-full flex overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`mx-auto transition-all duration-300 ${
            chatOpen
              ? "max-w-6xl"
              : "max-w-7xl"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* HEADER */}
            <div className="mb-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* COMPANY */}
                <div className="flex items-center gap-5 min-w-0">
                  <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-3xl font-bold shrink-0">
                    {company.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-3xl sm:text-5xl font-bold truncate">
                      {company.name}
                    </h1>

                    <p className="text-gray-500 mt-2 truncate">
                      {company.url}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                    Live Intelligence
                  </div>

                  <button
                    onClick={() =>
                      setChatOpen(
                        !chatOpen
                      )
                    }
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-3 transition-all"
                  >
                    <span className="text-sm text-white/70">
                      {chatOpen
                        ? "Hide Analyst"
                        : "Open Analyst"}
                    </span>

                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      {chatOpen
                        ? "→"
                        : "←"}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mb-8">
              <SummaryCard
                summary={company.summary}
              />
            </div>

            {/* PRODUCT HUNT */}
            {company.productHunt && (
              <div className="mb-8">
                <ProductHuntCard
                  productHunt={
                    company.productHunt
                  }
                />
              </div>
            )}

            {/* TOP GRID */}
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-8">
              <PricingCard
                pricing={
                  company.pricing
                }
              />

              <PositioningCard
                positioning={
                  company.positioning
                }
              />
            </div>

            {/* FEATURES */}
            <div className="mb-8">
              <FeatureTable
                features={
                  company.features
                }
              />
            </div>

            {/* SWOT */}
            <div className="mb-8">
              <SWOTCard
                strengths={
                  company.strengths
                }
                weaknesses={
                  company.weaknesses
                }
              />
            </div>

            {/* SEO + RECOMMENDATIONS */}
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 pb-16">
              <SEOCard
                keywords={
                  company.seoKeywords
                }
              />

              <RecommendationsCard
                recommendations={
                  company.recommendations
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* CHAT SIDEBAR */}
      <div
        className={`border-l border-white/10 bg-[#0b0b0b] transition-all duration-300 shrink-0 ${
          chatOpen
            ? "w-full sm:w-[420px]"
            : "w-0"
        }`}
      >
        <div
          className={`h-full transition-opacity duration-200 ${
            chatOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* HEADER */}
            <div className="h-20 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-semibold text-lg">
                  AI Analyst
                </h3>

                <p className="text-sm text-white/40">
                  Strategic insights &
                  reasoning
                </p>
              </div>

              <button
                onClick={() =>
                  setChatOpen(false)
                }
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>

            {/* PANEL */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full p-6">
                <ChatPanel
                  companyId={
                    company._id
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CHAT BUTTON */}
      {!chatOpen && (
        <button
          onClick={() =>
            setChatOpen(true)
          }
          className="fixed bottom-6 right-6 z-50 rounded-2xl bg-amber-200 text-black px-5 py-4 font-semibold shadow-2xl hover:bg-amber-100 transition-all lg:hidden"
        >
          Open AI Analyst
        </button>
      )}
    </div>
  );
}