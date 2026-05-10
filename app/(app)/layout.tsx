import Navbar from "@/components/shared/Navbar";

import Sidebar from "@/components/shared/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-black text-white">
      <div className="grid grid-cols-[288px_1fr] h-screen">
        {/* SIDEBAR */}
        <aside className="border-r border-white/10 bg-[#0b0b0b] overflow-hidden">
          <Sidebar />
        </aside>

        {/* MAIN */}
        <div className="flex flex-col min-w-0 h-screen">
          {/* NAVBAR */}
          <header className="h-20 border-b border-white/10 bg-black/60 backdrop-blur-xl shrink-0 sticky top-0 z-40">
            <Navbar />
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}