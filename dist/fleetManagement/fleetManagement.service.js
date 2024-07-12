"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementService = exports.updateFleetManagementService = exports.insertFleetManagementService = exports.getFleetManagementByIdService = exports.fleetManagementService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const fleetManagementService = async () => {
    return await db_1.default.query.fleetManagementTable.findMany();
};
exports.fleetManagementService = fleetManagementService;
const getFleetManagementByIdService = async (id) => {
    return await db_1.default.query.fleetManagementTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.fleetId, id)
    });
};
exports.getFleetManagementByIdService = getFleetManagementByIdService;
// insertFleetManagementService function adjusted to return the created fleet management record
const insertFleetManagementService = async (record) => {
    const result = await db_1.default.insert(schema_1.fleetManagementTable).values(record)
        .returning({ fleet_id: schema_1.fleetManagementTable.fleetId, vehicle_id: schema_1.fleetManagementTable.vehicleId, acquisition_date: schema_1.fleetManagementTable.acquisitionDate, depreciation_rate: schema_1.fleetManagementTable.depreciationRate, current_value: schema_1.fleetManagementTable.currentValue, maintenance_cost: schema_1.fleetManagementTable.maintenanceCost, status: schema_1.fleetManagementTable.status })
        .execute();
    if (result) {
        const createdRecord = result[0];
        return createdRecord;
    }
    else {
        throw new Error("Failed to insert fleet management record");
    }
};
exports.insertFleetManagementService = insertFleetManagementService;
const updateFleetManagementService = async (id, record) => {
    await db_1.default.update(schema_1.fleetManagementTable).set(record).where((0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.fleetId, id));
    return "Fleet management record updated successfully 🎉";
};
exports.updateFleetManagementService = updateFleetManagementService;
const deleteFleetManagementService = async (id) => {
    await db_1.default.delete(schema_1.fleetManagementTable).where((0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.fleetId, id));
    return "Fleet management record deleted successfully 🎉";
};
exports.deleteFleetManagementService = deleteFleetManagementService;
