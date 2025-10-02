import { defineAction } from "astro:actions";
import { prisma } from "../lib/prisma";

export const server = {
  addItem: defineAction({
    accept: "form",
    handler: async (input) => {
      const name = input.get("name")?.toString();

      if (name) {
        await prisma.item.create({ data: { name } });
      }

      return { success: true };
    },
  }),
};
