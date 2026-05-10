import DemoPreview from "@/components/landing/DemoPreview";

import Hero from "@/components/landing/Hero";

import UrlForm from "@/components/landing/UrlForm";

import Footer from "@/components/shared/Footer";

import Navbar from "@/components/shared/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* STICKY NAVBAR */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <Navbar mode="marketing" />
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-12">
        <Hero />

        <UrlForm />

        <DemoPreview />
      </div>

      <Footer />
    </main>
  );
}