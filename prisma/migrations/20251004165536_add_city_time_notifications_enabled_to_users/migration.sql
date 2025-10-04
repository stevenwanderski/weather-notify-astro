-- AlterTable
ALTER TABLE "user" ADD COLUMN     "city" TEXT,
ADD COLUMN     "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "time" TEXT;
