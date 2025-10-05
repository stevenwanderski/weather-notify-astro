import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = await prisma.user.findMany();

const now = new Date();

console.log(`Cron has run!! Time: ${now.toLocaleTimeString()}`);
