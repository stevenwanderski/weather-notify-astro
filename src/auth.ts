import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({user, url, token}, request) => {
      const { data, error } = await resend.emails.send({
        from: 'Weather Notify <weather-notify@resend.dev>',
        to: [user.email],
        subject: 'Weather Notify - Reset Password',
        html: `<p>Use the following link to reset your password:<br><br>${url}</p>`
      });
    },
  },

  trustedOrigins: [
    "http://localhost:4321"
  ],

  user: {
    additionalFields: {
      city: {
        type: "string",
        required: false,
        input: false
      },
      time: {
        type: "string",
        required: false,
        input: false
      },
      notificationsEnabled: {
        type: "boolean",
        defaultValue: true,
        input: false
      }
    },
  },
});