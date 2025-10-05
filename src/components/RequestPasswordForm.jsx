import { requestPasswordReset } from "@/lib/auth-client";
import { useState } from "react";

export default function RequestPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { data, error } = await requestPasswordReset({
      email,
      redirectTo: '/reset-password'
    });

    setLoading(false);

    if (!error) {
      setMessage('Check your email for a password reset link.');
    } else {
      setError(error);
    }

    setEmail('');
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-10">
        Request Password.
      </h1>

      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-4 mb-10 rounded max-w-[400px]">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 text-sm p-4 mb-10 rounded max-w-[400px]">
          {message}
        </div>
      )}

      <div className="mb-10">
        <form className="max-w-[400px]" onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="label">Email</label>

            <input
              type="text"
              name="email"
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <button className="btn" disabled={loading}>Submit</button>

            <a href="/login" className="hover:underline text-sm">Back to login</a>
          </div>
        </form>
      </div>
    </div>
  )
}