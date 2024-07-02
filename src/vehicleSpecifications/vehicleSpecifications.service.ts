import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { VehicleSpecificationSelect, VehicleSpecificationInsert, vehicleSpecificationsTable } from "../drizzle/schema";

export const vehicleSpecificationsService = async (): Promise<VehicleSpecificationSelect[] | null> => {
    return await db.query.vehicleSpecificationsTable.findMany();
}

export const getVehicleSpecificationByIdService = async (id: number): Promise<VehicleSpecificationSelect | undefined> => {
    return await db.query.vehicleSpecificationsTable.findFirst({
        where: eq(vehicleSpecificationsTable.vehicleId, id)
    });
}

// insertVehicleSpecificationService function adjusted to return the created vehicle specification
export const insertVehicleSpecificationService = async (vehicleSpecification: VehicleSpecificationInsert) => {
    const result = await db.insert(vehicleSpecificationsTable).values(vehicleSpecification)
        .returning({ vehicle_id: vehicleSpecificationsTable.vehicleId, manufacturer: vehicleSpecificationsTable.manufacturer, model: vehicleSpecificationsTable.model, year: vehicleSpecificationsTable.year })
        .execute();

    if (result) {
        const createdVehicleSpecification = result[0];
        return createdVehicleSpecification;
    } else {
        throw new Error("Failed to insert vehicle specification");
    }
}

export const updateVehicleSpecificationService = async (id: number, vehicleSpecification: VehicleSpecificationInsert) => {
    await db.update(vehicleSpecificationsTable).set(vehicleSpecification).where(eq(vehicleSpecificationsTable.vehicleId, id));
    return "Vehicle specification updated successfully 🎉";
}

export const deleteVehicleSpecificationService = async (id: number) => {
    await db.delete(vehicleSpecificationsTable).where(eq(vehicleSpecificationsTable.vehicleId, id));
    return "Vehicle specification deleted successfully 🎉";
}
