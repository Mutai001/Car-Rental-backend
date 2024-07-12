"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.insertLocationService = exports.getLocationByIdService = exports.locationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//fetch all locations
const locationsService = async () => {
    return await db_1.default.query.locationsTable.findMany();
};
exports.locationsService = locationsService;
//fetch one location
// export const getLocationByIdService = async (id: number): Promise<LocationSelect | undefined> => {
//     return await db.query.locationsTable.findFirst({
//         where: eq(locationsTable.locationId, id)
//     });
// }
const getLocationByIdService = async (id) => {
    const location = await db_1.default.query.locationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.locationsTable.locationId, id),
        // select: { locationId: true, name: true, address: true, contactPhone: true } as const,
    });
    // ... rest of the code
    return location;
};
exports.getLocationByIdService = getLocationByIdService;
// insertLocationService function adjusted to return the created location
const insertLocationService = async (location) => {
    const result = await db_1.default.insert(schema_1.locationsTable).values(location)
        .returning({ location_id: schema_1.locationsTable.locationId, name: schema_1.locationsTable.name, address: schema_1.locationsTable.address, contact_phone: schema_1.locationsTable.contactPhone })
        .execute();
    if (result) {
        const createdLocation = result[0];
        return createdLocation;
    }
    else {
        throw new Error("Failed to insert location");
    }
};
exports.insertLocationService = insertLocationService;
const updateLocationService = async (id, location) => {
    await db_1.default.update(schema_1.locationsTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.locationsTable.locationId, id));
    return "Location updated successfully 🎉";
};
exports.updateLocationService = updateLocationService;
const deleteLocationService = async (id) => {
    await db_1.default.delete(schema_1.locationsTable).where((0, drizzle_orm_1.eq)(schema_1.locationsTable.locationId, id));
    return "Location deleted successfully 🎉";
};
exports.deleteLocationService = deleteLocationService;
