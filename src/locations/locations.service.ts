import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { LocationSelect, LocationInsert, locationsTable } from "../drizzle/schema";

export const locationsService = async (): Promise<LocationSelect[] | null> => {
    return await db.query.locationsTable.findMany();
}

export const getLocationByIdService = async (id: number): Promise<LocationSelect | undefined> => {
    return await db.query.locationsTable.findFirst({
        where: eq(locationsTable.locationId, id)
    });
}

// insertLocationService function adjusted to return the created location
export const insertLocationService = async (location: LocationInsert) => {
    const result = await db.insert(locationsTable).values(location)
        .returning({ location_id: locationsTable.locationId, name: locationsTable.name, address: locationsTable.address, contact_phone: locationsTable.contactPhone })
        .execute();

    if (result) {
        const createdLocation = result[0];
        return createdLocation;
    } else {
        throw new Error("Failed to insert location");
    }
}

export const updateLocationService = async (id: number, location: LocationInsert) => {
    await db.update(locationsTable).set(location).where(eq(locationsTable.locationId, id));
    return "Location updated successfully 🎉";
}

export const deleteLocationService = async (id: number) => {
    await db.delete(locationsTable).where(eq(locationsTable.locationId, id));
    return "Location deleted successfully 🎉";
}
