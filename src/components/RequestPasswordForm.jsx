import { useState } from "react";
import { requestPasswordReset } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cloudy from '@/assets/cloudy.png';

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
    <div className="py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a href="/">
          <img src={cloudy.src} alt="Logo" className="size-10 mx-auto" />
        </a>

        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
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

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                {...register('email')}
                className="input"
              />
              {errors.email && <p className="error-text mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Send reset email
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          <a href="/login" className="font-semibold text-blue-500 hover:text-blue-600">
            Click here to login.
          </a>
        </p>
      </div>
    </div>
  )
}