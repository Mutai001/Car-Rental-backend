import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { FleetManagementSelect, FleetManagementInsert, fleetManagementTable } from "../drizzle/schema";

export const fleetManagementService = async (): Promise<FleetManagementSelect[] | null> => {
    return await db.query.fleetManagementTable.findMany();
}

export const getFleetManagementByIdService = async (id: number): Promise<FleetManagementSelect | undefined> => {
    return await db.query.fleetManagementTable.findFirst({
        where: eq(fleetManagementTable.fleetId, id)
    });
}

// insertFleetManagementService function adjusted to return the created fleet management record
export const insertFleetManagementService = async (record: FleetManagementInsert) => {
    const result = await db.insert(fleetManagementTable).values(record)
        .returning({ fleet_id: fleetManagementTable.fleetId, vehicle_id: fleetManagementTable.vehicleId, acquisition_date: fleetManagementTable.acquisitionDate, depreciation_rate: fleetManagementTable.depreciationRate, current_value: fleetManagementTable.currentValue, maintenance_cost: fleetManagementTable.maintenanceCost, status: fleetManagementTable.status })
        .execute();

    if (result) {
        const createdRecord = result[0];
        return createdRecord;
    } else {
        throw new Error("Failed to insert fleet management record");
    }
}

export const updateFleetManagementService = async (id: number, record: FleetManagementInsert) => {
    await db.update(fleetManagementTable).set(record).where(eq(fleetManagementTable.fleetId, id));
    return "Fleet management record updated successfully 🎉";
}

export const deleteFleetManagementService = async (id: number) => {
    await db.delete(fleetManagementTable).where(eq(fleetManagementTable.fleetId, id));
    return "Fleet management record deleted successfully 🎉";
}
