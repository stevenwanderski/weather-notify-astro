import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "@/lib/auth-client";
import Message from "@/components/Message";

export default function AccountForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState, watch, reset } = useForm();
  const { errors } = formState;

  const newPassword = watch('newPassword');

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
      setError(error);
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
              {...register('currentPassword', { required: 'Current Password is required' })}
              type="password"
              className="input"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
          </div>

          <hr className="hr" />

          <div>
            <label htmlFor="newPassword" className="label mb-1">New Password</label>
            <input
              {...register('newPassword', { required: 'New Password is required' })}
              type="password"
              className="input"
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label mb-1">Confirm Password</label>
            <input
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => {
                  return value === newPassword || "Passwords do not match";
                }
              })}
              type="password"
              className="input"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button className="btn" disabled={loading}>Update Password</button>
          </div>
        </div>
      </form>
    </div>
  )
}