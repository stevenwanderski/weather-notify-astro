import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/lib/auth-client";
import Message from "@/components/Message";

const schema = z
  .object({
    currentPassword: z.string().nonempty("Current Password is required"),
    newPassword: z.string().nonempty("New Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AccountForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = async (values) => {
    setLoading(true);

    const { data, error } = await changePassword({
      newPassword: values.newPassword,
      currentPassword: values.currentPassword
    });

    setLoading(false);

    if (!error) {
      setMessage('Password has been updated.');
    } else {
      alert(error);
    }

    setMessage('Password has been updated.');
    setLoading(false);
    reset();
  }

  const closeMessage = () => {
    setMessage('');
  }

  return (
    <div>
      {message && <Message text={message} onClose={closeMessage} />}

      <form onSubmit={handleSubmit(submit)}>
        <div className="space-y-6 max-w-[400px]">
          <div>
            <label htmlFor="currentPassword" className="label mb-1">Current Password</label>
            <input
              {...register('currentPassword')}
              type="password"
              className="input"
            />
            {errors.currentPassword && <p className="error-text mt-1">{errors.currentPassword.message}</p>}
          </div>

          <hr className="hr" />

          <div>
            <label htmlFor="newPassword" className="label mb-1">New Password</label>
            <input
              {...register('newPassword')}
              type="password"
              className="input"
            />
            {errors.newPassword && <p className="error-text mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label mb-1">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="input"
            />
            {errors.confirmPassword && <p className="error-text mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button className="btn" disabled={loading}>Update Password</button>
          </div>
        </div>
      </form>
    </div>
  )
}