import { sendForecastEmail } from "../utils/send-forecast-email.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// helper: return local start-of-day (00:00) for a given date
function getLocalStartOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

async function main() {
  const now = new Date();

  const currentHour = Number(
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Chicago' }).format(now)
  );

  console.log(`[${now.toISOString()}] Running hourly notification check (hour=${currentHour})`);

  const startOfDay = getLocalStartOfDay(now);

  // Reserve eligible users atomically: haven't been sent today, not currently reserved
  const reserveResult = await prisma.user.updateMany({
    where: {
      time: `${currentHour}`,
      notificationsEnabled: true,
      lastEmailReservedAt: null,
      OR: [
        { lastEmailSentAt: null },
        { lastEmailSentAt: { lt: startOfDay } }
      ]
    },
    data: {
      lastEmailReservedAt: now,
    },
  });

  if (reserveResult.count === 0) {
    console.log('No users reserved to notify this hour.');
    return;
  }

  // fetch users reserved by this run. use a small window to avoid races with other runs
  const reservationCutoff = new Date(now.getTime() - 60 * 1000); // 1 minute ago
  const users = await prisma.user.findMany({
    where: {
      lastEmailReservedAt: { gte: reservationCutoff },
    },
  });

  if (users.length === 0) {
    console.log('Reserved users found none after reservation (possible race).');
    return;
  }

  console.log(`Found ${users.length} users to notify:`);

  for (const user of users) {
    console.log(`- Sending email to ${user.email}`);

    try {
      await sendForecastEmail(user.email, user.city);

      // mark as sent for today and clear reservation
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastEmailSentAt: new Date(),
          lastEmailReservedAt: null,
        },
      });

    } catch (err) {
      console.error(`Failed to send email to ${user.email}:`, err);
      // clear reservation so the user can be retried later
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastEmailReservedAt: null },
        });
      } catch (e) {
        console.error(`Failed to clear reservation for ${user.email}:`, e);
      }
    }
  }

  console.log('Hourly notifications complete.');
}

main()
  .catch((err) => {
    console.error('Fatal error in cron job:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
