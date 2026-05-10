import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}