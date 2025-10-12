import 'dotenv/config';
import { getDailyForecast } from '../utils/weather.js';
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import juice from "juice";
import { Resend } from 'resend';

Handlebars.registerHelper("and", (a, b) => a && b);
Handlebars.registerHelper("gte", (a, b) => a >= b);
Handlebars.registerHelper("lte", (a, b) => a <= b);

export async function sendForecastEmail(email, city) {
  const forecast = await getDailyForecast(city);
  const formattedDate = formatLocalDate(forecast.date)

  const templatePath = path.resolve("emailTemplates/dailyForecastEmail.html");
  const src = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(src);

  const rawHtml = template({
    date: formattedDate,
    city: forecast.city,
    hours: forecast.hours
  });

  const html = juice(rawHtml);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const res = await resend.emails.send({
      from: 'Sky Brief <hello@skybrief.app>',
      to: [email],
      subject: `Weather Forecast for ${city} - ${formattedDate}`,
      html: html
    });

    // Some SDKs return an object with an `error` field instead of throwing.
    if (res && res.error) {
      const errMsg = res.error.message || JSON.stringify(res.error);
      const err = new Error(`Resend error: ${errMsg}`);
      // attach original response for debugging
      err.response = res;
      throw err;
    }

    return res;
  } catch (err) {
    // bubble up so callers (cron.js) can catch and handle failures
    console.error('Error sending forecast email to', email, err);
    throw err;
  }
}

function formatLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const localDate = new Date(year, month - 1, day); // ✅ uses local time, not UTC
  return localDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// import { getTodayForecast } from '../utils/weather.js';

// const forecast = await getTodayForecast('Palos Heights, IL');

// console.log(forecast);

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   const now = new Date();
//   const currentHour = now.getHours(); // e.g. 14 for 2PM
//   console.log(`[${now.toISOString()}] Running hourly notification check (hour=${currentHour})`);

//   const users = await prisma.user.findMany({
//     where: {
//       time: `${currentHour}`,
//       notificationsEnabled: true,
//     },
//   });

//   if (users.length === 0) {
//     console.log('No users to notify this hour.');
//     return;
//   }

//   console.log(`Found ${users.length} users to notify:`);

//   for (const user of users) {
//     console.log(`- Sending email to ${user.email}`);

//     try {
//       await fakeSendEmail(user.email);
//     } catch (err) {
//       console.error(`❌ Failed to send email to ${user.email}:`, err);
//     }
//   }

//   console.log('✅ Hourly notifications complete.');
// }

// async function fakeSendEmail(email) {
//   // simulate delay
//   await new Promise((res) => setTimeout(res, 100));
//   console.log(`📧 (pretend) email sent to ${email}`);
// }

// main()
//   .catch((err) => {
//     console.error('Fatal error in cron job:', err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
