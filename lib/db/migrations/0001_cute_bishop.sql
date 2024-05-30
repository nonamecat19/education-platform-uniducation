ALTER TABLE "laboratory_works" DROP CONSTRAINT "laboratory_works_course_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "laboratory_works" ADD COLUMN "unit_id" varchar(256) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "laboratory_works" ADD CONSTRAINT "laboratory_works_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "laboratory_works" DROP COLUMN IF EXISTS "course_id";
