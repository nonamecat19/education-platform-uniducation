DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "teachers" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "teachers" DROP COLUMN IF EXISTS "password";