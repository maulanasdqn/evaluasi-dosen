ALTER TABLE "user" ALTER COLUMN "permissions" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "permissions" DROP NOT NULL;