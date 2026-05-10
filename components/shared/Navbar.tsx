import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 border-b">
      <h1 className="text-2xl font-bold">
        SpyGlass AI
      </h1>

      <LogoutButton />
    </nav>
  );
}