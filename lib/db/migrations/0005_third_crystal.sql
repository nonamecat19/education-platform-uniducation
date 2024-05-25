ALTER TABLE "teachers" RENAME COLUMN "patronymic" TO "patronymic";--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "group_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "profession" DROP NOT NULL;