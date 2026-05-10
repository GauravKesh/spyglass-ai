import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/shared/Navbar";

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Navbar mode="marketing" />
      <div className="min-h-[calc(100vh-88px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md border border-white/10 rounded-3xl p-8 md:p-10 bg-white/5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
            Start your workspace
          </p>
          <h1 className="text-3xl mb-6">
            Create Account
          </h1>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
}