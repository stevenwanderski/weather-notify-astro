import { resetPassword } from "@/lib/auth-client";
import { navigate } from "astro:transitions/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    password: z.string().nonempty("Password is required")
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
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-10">
        Reset Password.
      </h1>

      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-4 mb-10 rounded max-w-[400px]">
          {error}
        </div>
      )}

      <div className="mb-10">
        <form className="max-w-[400px]" onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label htmlFor="password" className="label">Password</label>
            <input
              {...register('password')}
              className="input"
              type="password"
            />
            {errors.password && <p className="error-text mt-1">{errors.password.message}</p>}
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