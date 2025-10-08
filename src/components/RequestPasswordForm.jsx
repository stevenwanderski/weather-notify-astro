import { useState } from "react";
import { requestPasswordReset } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    email: z.string().nonempty("Email is required")
  });

export default function RequestPasswordForm() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = async (values) => {
    setLoading(true);

    const { data, error } = await requestPasswordReset({
      email: values.email,
      redirectTo: '/reset-password'
    });

    setLoading(false);

    if (!error) {
      setMessage('Check your email for a password reset link.');
    } else {
      setError(error.message);
    }

    reset();
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
        <form className="max-w-[400px]" onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label htmlFor="email" className="label">Email</label>
            <input
              {...register('email')}
              className="input"
            />
            {errors.email && <p className="error-text mt-1">{errors.email.message}</p>}

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