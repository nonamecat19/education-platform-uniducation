CREATE TABLE IF NOT EXISTS "submitted_laboratory_work" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"student_id" varchar(256) NOT NULL,
	"laboratory_work_id" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"mark" integer,
	"student_comment" text,
	"teacher_comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submitted_laboratory_work" ADD CONSTRAINT "submitted_laboratory_work_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submitted_laboratory_work" ADD CONSTRAINT "submitted_laboratory_work_laboratory_work_id_laboratory_works_id_fk" FOREIGN KEY ("laboratory_work_id") REFERENCES "public"."laboratory_works"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
