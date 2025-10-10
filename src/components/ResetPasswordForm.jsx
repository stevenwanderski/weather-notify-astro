import { resetPassword } from "@/lib/auth-client";
import { navigate } from "astro:transitions/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cloudy from '@/assets/cloudy.png';

const schema = z
  .object({
    password: z.string().nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm({ token }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = async (values) => {
    setLoading(true);

    const { data, error } = await resetPassword({
      newPassword: values.password,
      token
    });

    setLoading(false);

    if (!error) {
      navigate('/dashboard');
    } else {
      setError(error.message);
    }

    reset();
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src={cloudy.src} alt="Logo" className="size-10 mx-auto" />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your new password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-4 mb-10 rounded max-w-[400px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div>
              <label htmlFor="password" className="label">New Password</label>
              <input
                {...register('password')}
                className="input"
                type="password"
              />
              {errors.password && <p className="error-text mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                className="input"
                type="password"
              />
              {errors.confirmPassword && <p className="error-text mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Save password
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