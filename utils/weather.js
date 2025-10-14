import 'dotenv/config';
import axios from "axios";

/**
 * Fetch hourly forecast for a given city and return a filtered list
 * from 6 AM to 10 PM formatted for the email template.
 */
export async function getDailyForecast(city) {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) throw new Error("Missing WEATHER_API_KEY in .env");
  // retry helper for transient errors (5xx or network errors)
  async function tryFetch(attempt = 1) {
    try {
      return await axios.get("https://api.weatherapi.com/v1/forecast.json", {
        params: {
          key: API_KEY,
          q: city,
          aqi: "no",
          alerts: "no",
        },
        timeout: 10_000, // 10s timeout
      });
    } catch (err) {
      const status = err?.response?.status;
      const isServerError = status && status >= 500 && status < 600;
      const isNetworkError = !err?.response; // e.g., ECONNRESET, ENOTFOUND, ETIMEDOUT

      const maxAttempts = 4;

      if ((isServerError || isNetworkError) && attempt < maxAttempts) {
        // exponential backoff with jitter
        const baseDelay = 300; // ms
        const backoff = baseDelay * Math.pow(2, attempt - 1);
        const jitter = Math.floor(Math.random() * 200);
        const delay = backoff + jitter;

        // small log for visibility
        console.warn(`Weather API request failed (attempt ${attempt})`, status || err.code || err.message);
        await new Promise((res) => setTimeout(res, delay));
        return tryFetch(attempt + 1);
      }

      // non-retriable or max attempts reached — attach response and rethrow
      if (err?.response) err.responseData = err.response.data;
      throw err;
    }
  }

  const res = await tryFetch();

  const forecast = res.data.forecast.forecastday[0];
  const hours = forecast.hour
    .filter((h) => {
      const hour = new Date(h.time).getHours();
      return hour >= 6 && hour <= 22; // between 6 AM – 10 PM
    })
    .map((h) => {
      const date = new Date(h.time);
      const hour = date.getHours();
      const isPM = hour >= 12;
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      const time_label = `${formattedHour}:00${isPM ? "pm" : "am"}`;

      return {
        hour,
        time_label,
        temp: Math.round(h.temp_f),
        condition: h.condition.text,
        icon: `https:${h.condition.icon}`,
      };
    });

  return {
    city: res.data.location.name,
    date: forecast.date,
    hours,
  };
}