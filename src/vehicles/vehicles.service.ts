import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { VehicleSelect, VehicleInsert, VehiclesTable } from "../drizzle/schema";

export const vehiclesService = async (): Promise<VehicleSelect[] | null> => {
    return await db.query.VehiclesTable.findMany();
}

export const getVehicleByIdService = async (id: number): Promise<VehicleSelect | undefined> => {
    return await db.query.VehiclesTable.findFirst({
        where: eq(VehiclesTable.vehicleSpecId, id)
    });
}

// insertVehicleService function adjusted to return the created vehicle
export const insertVehicleService = async (vehicle: VehicleInsert) => {
    const result = await db.insert(VehiclesTable).values(vehicle)
        .returning({ vehicle_spec_id: VehiclesTable.vehicleSpecId, vehicle_id: VehiclesTable.vehicleId, rental_rate: VehiclesTable.rentalRate, availability: VehiclesTable.availability })
        .execute();

    if (result) {
        const createdVehicle = result[0];
        return createdVehicle;
    } else {
        throw new Error("Failed to insert vehicle");
    }
}

export const updateVehicleService = async (id: number, vehicle: VehicleInsert) => {
    await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleSpecId, id));
    return "Vehicle updated successfully 🎉";
}

export const deleteVehicleService = async (id: number) => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleSpecId, id));
    return "Vehicle deleted successfully 🎉";
}
