ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_vehicleSpec_id_vehicle_specifications_vehicle_id_fk";
--> statement-breakpoint
ALTER TABLE "vehicle_specifications" ADD COLUMN "vehicleSpec_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicleSpec_id_vehicle_specifications_vehicleSpec_id_fk" FOREIGN KEY ("vehicleSpec_id") REFERENCES "public"."vehicle_specifications"("vehicleSpec_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "vehicle_specifications" DROP COLUMN IF EXISTS "vehicle_id";