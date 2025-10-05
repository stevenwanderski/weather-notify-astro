import { signIn } from "@/lib/auth-client";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    signIn.email({
      email,
      password,
      callbackURL: "/dashboard"
    }, {
      onRequest: (ctx) => {
        setLoading(true);
      },

      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      }
    });
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-10">
        Login.
      </h1>

      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-4 mb-10 rounded max-w-[400px]">
          {error}
        </div>
      )}

      <div className="mb-10">
        <form className="max-w-[400px]" onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="label">Email</label>
            <input type="text" name="email" id="email" className="input" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="label">Password</label>
            <input type="text" name="password" id="password" className="input" />
          </div>

          <div className="flex justify-between items-center mb-6">
            <button className="btn" disabled={loading}>Submit</button>

            <a href="/register" className="hover:underline text-sm">Create an account</a>
          </div>

          <hr className="border-0 border-b border-zinc-200 mb-6" />

          <div className="flex justify-start items-center">
            <a href="/request-password" className="hover:underline text-sm">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  )
}