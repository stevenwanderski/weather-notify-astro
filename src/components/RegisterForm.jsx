import { signUp } from "@/lib/auth-client";
import { navigate } from 'astro:transitions/client';
import { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    signUp.email({
      name: 'Mick Jagger',
      email,
      password,
      callbackURL: "/dashboard"
    }, {
      onRequest: (ctx) => {
        setLoading(true);
      },

      onSuccess: (ctx) => {
        navigate('/dashboard');
      },

      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
        console.log(ctx);
      }
    });
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-10">
        Register.
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

          <div className="flex justify-between items-center">
            <button className="btn" disabled={loading}>Submit</button>

            <a href="/login" className="hover:underline text-sm">Login</a>
          </div>
        </form>
      </div>
    </div>
  )
}