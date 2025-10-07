import { useState } from "react";
import { updateUser } from "@/lib/auth-client";
import Message from "@/components/Message";

export default function DashboardForm({ user }) {
  const [city, setCity] = useState(user.city);
  const [time, setTime] = useState(user.time);
  const [enabled, setEnabled] = useState(user.notificationsEnabled);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();

    updateUser({
      city,
      time,
      notificationsEnabled: enabled
    }, {
      onRequest: (ctx) => {
        setLoading(true);
      },

      onSuccess: (ctx) => {
        setLoading(false);
        setMessage('Settings have been saved.')
      },

      onError: (ctx) => {
        alert(ctx.error.message);
      }
    })
  }

  const closeMessage = () => {
    setMessage('');
  }

  return (
    <div>
      {message && <Message text={message} onClose={closeMessage} />}

      <form onSubmit={submit}>
        <div className="space-y-8 max-w-[400px]">
          <div>
            <label htmlFor="city" className="label mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="input"
              defaultValue={user.city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="time" className="label mb-1">Notification Time (Central Standard Time)</label>
            <div className="grid grid-cols-1">
              <select
                name="time"
                id="time"
                className="select"
                onChange={(e) => setTime(e.target.value)}
                defaultValue={user.time}
              >
                <option value="0">12:00am</option>
                <option value="1">1:00am</option>
                <option value="2">2:00am</option>
                <option value="3">3:00am</option>
                <option value="4">4:00am</option>
                <option value="5">5:00am</option>
                <option value="6">6:00am</option>
                <option value="7">7:00am</option>
                <option value="8">8:00am</option>
                <option value="9">9:00am</option>
                <option value="10">10:00am</option>
                <option value="11">11:00am</option>
                <option value="12">12:00pm</option>
                <option value="13">1:00pm</option>
                <option value="14">2:00pm</option>
                <option value="15">3:00pm</option>
                <option value="16">4:00pm</option>
                <option value="17">5:00pm</option>
                <option value="18">6:00pm</option>
                <option value="19">7:00pm</option>
                <option value="20">8:00pm</option>
                <option value="21">9:00pm</option>
                <option value="22">10:00pm</option>
                <option value="23">11:00pm</option>
              </select>

              <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400">
                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-green-600 transition-colors duration-200 ease-in-out has-checked:bg-green-600 has-focus-visible:outline-2 dark:bg-white/5 dark:inset-ring-white/10 dark:outline-green-500 dark:has-checked:bg-green-500">
              <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5"></span>

              <input
                type="checkbox"
                name="enabled"
                id="enabled"
                className="absolute inset-0 appearance-none focus:outline-hidden"
                defaultChecked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
            </div>

            <div>
              <label htmlFor="enabled" className="label">Notifications enabled</label>
            </div>
          </div>

          <div>
            <button className="btn" disabled={loading}>Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}