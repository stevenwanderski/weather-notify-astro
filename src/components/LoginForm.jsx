import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";

const schema = z
  .object({
    email: z.string().nonempty("Email is required"),
    password: z.string().nonempty("Password is required")
  });

export default function LoginForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (values) => {
    signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard"
    }, {
      onRequest: (ctx) => {
        setLoading(true);
      },

      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
        reset();
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
        <form className="max-w-[400px]" onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label htmlFor="email" className="label">Email</label>
            <input
              {...register('email')}
              className="input"
            />
            {errors.email && <p className="error-text mt-1">{errors.email.message}</p>}
          </div>

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

            <a href="/register" className="hover:underline text-sm">Create an account</a>
          </div>

          <hr className="hr" />

          <div className="flex justify-start items-center">
            <a href="/request-password" className="hover:underline text-sm">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  )
}