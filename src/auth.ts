import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true,
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