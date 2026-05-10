"use client";

import Navbar from "./Navbar";

import Sidebar from "./Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 w-72 h-screen border-r border-white/10 bg-[#0b0b0b] z-40">
        <Sidebar />
      </aside>

      {/* MAIN AREA */}
      <div className="pl-72 h-screen flex flex-col">
        {/* NAVBAR */}
        <header className="fixed top-0 left-72 right-0 h-20 border-b border-white/10 bg-black/70 backdrop-blur-2xl z-30">
          <Navbar />
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}