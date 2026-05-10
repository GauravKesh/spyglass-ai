import Hero from "@/components/landing/Hero";

import UrlForm from "@/components/landing/UrlForm";

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <Hero />

      <UrlForm />
    </main>
  );
}