"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementService = exports.updateFleetManagementService = exports.createFleetManagementService = exports.getFleetManagementByIdService = exports.getAllFleetManagementService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all fleet management entries
const getAllFleetManagementService = async () => {
    const fleetManagementEntries = await db_1.db.query.FleetManagementTable.findMany();
    return fleetManagementEntries;
};
exports.getAllFleetManagementService = getAllFleetManagementService;
// Get fleet management entry by ID
const getFleetManagementByIdService = async (fleet_id) => {
    const fleetManagementEntry = await db_1.db.query.FleetManagementTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleet_id, fleet_id),
    });
    return fleetManagementEntry;
};
exports.getFleetManagementByIdService = getFleetManagementByIdService;
// Create fleet management entry
const createFleetManagementService = async (fleetManagementEntry) => {
    await db_1.db.insert(schema_1.FleetManagementTable).values(fleetManagementEntry);
    return "Fleet management entry created successfully";
};
exports.createFleetManagementService = createFleetManagementService;
// Update fleet management entry
const updateFleetManagementService = async (fleet_id, fleetManagementEntry) => {
    await db_1.db.update(schema_1.FleetManagementTable).set(fleetManagementEntry).where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleet_id, fleet_id));
    return "Fleet management entry updated successfully";
};
exports.updateFleetManagementService = updateFleetManagementService;
// Delete fleet management entry
const deleteFleetManagementService = async (fleet_id) => {
    await db_1.db.delete(schema_1.FleetManagementTable).where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleet_id, fleet_id));
    return "Fleet management entry deleted successfully";
};
exports.deleteFleetManagementService = deleteFleetManagementService;
