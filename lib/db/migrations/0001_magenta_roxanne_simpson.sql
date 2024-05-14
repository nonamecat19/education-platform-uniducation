ALTER TABLE "teachers" ALTER COLUMN "created_at" SET DEFAULT now
        ();--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "updated_at" SET DEFAULT now
        ();--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text;