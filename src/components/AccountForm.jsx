import { useState } from "react";
import { changePassword } from "@/lib/auth-client";
import Message from "@/components/Message";

export default function AccountForm({ user }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    // setLoading(true);

    // const { data, error } = await changePassword({
    //   newPassword: password,
    //   currentPassword: "oldpassword1234"
    // });

    // setLoading(false);

    // if (!error) {
    //   setMessage('Password has been updated.');
    // } else {
    //   setError(error);
    // }

    setMessage('Password has been updated.');

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  const closeMessage = () => {
    setMessage('');
  }

  return (
    <div>
      {message && <Message text={message} onClose={closeMessage} />}

      <form onSubmit={submit}>
        <div className="space-y-6 max-w-[400px]">
          <div>
            <label htmlFor="currentPassword" className="label mb-1">Current Password</label>
            <input
              type="text"
              id="currentPassword"
              name="currentPassword"
              className="input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <hr className="hr" />

          <div>
            <label htmlFor="newPassword" className="label mb-1">New Password</label>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label mb-1">Confirm Password</label>
            <input
              type="text"
              id="password"
              name="confirmPassword"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <button className="btn" disabled={loading}>Update Password</button>
          </div>
        </div>
      </form>
    </div>
  )
}