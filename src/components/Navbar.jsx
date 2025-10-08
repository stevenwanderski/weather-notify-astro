import { navigate } from "astro:transitions/client";
import { signOut } from "@/lib/auth-client";

export default function Navbar({ email }) {
  const logout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login");
        },
      },
    })
  }

  return (
    <div className="bg-zinc-900">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex gap-8">
            <a href="/dashboard" className="hover:underline">Dashboard</a>
            <a href="/account" className="hover:underline">Account</a>
          </div>

          <div className="flex items-center gap-8">
            {email}
            <button className="btn !bg-zinc-700" type="button" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}