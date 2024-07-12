"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.createLocationService = exports.getLocationByIdService = exports.getAllLocationsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all locations
const getAllLocationsService = async () => {
    const locations = await db_1.db.query.LocationsTable.findMany();
    return locations;
};
exports.getAllLocationsService = getAllLocationsService;
// Get location by ID
const getLocationByIdService = async (location_id) => {
    const location = await db_1.db.query.LocationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.LocationsTable.location_id, location_id),
    });
    return location;
};
exports.getLocationByIdService = getLocationByIdService;
// Create location
const createLocationService = async (location) => {
    await db_1.db.insert(schema_1.LocationsTable).values(location);
    return "Location created successfully";
};
exports.createLocationService = createLocationService;
// Update location
const updateLocationService = async (location_id, location) => {
    await db_1.db.update(schema_1.LocationsTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.LocationsTable.location_id, location_id));
    return "Location updated successfully";
};
exports.updateLocationService = updateLocationService;
// Delete location
const deleteLocationService = async (location_id) => {
    await db_1.db.delete(schema_1.LocationsTable).where((0, drizzle_orm_1.eq)(schema_1.LocationsTable.location_id, location_id));
    return "Location deleted successfully";
};
exports.deleteLocationService = deleteLocationService;
