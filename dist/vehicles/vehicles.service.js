"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleService = exports.updateVehicleService = exports.createVehicleService = exports.getVehicleByIdService = exports.getAllVehiclesService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all vehicles
const getAllVehiclesService = async () => {
    const vehicles = await db_1.db.query.VehiclesTable.findMany();
    return vehicles;
};
exports.getAllVehiclesService = getAllVehiclesService;
// Get vehicle by ID
const getVehicleByIdService = async (vehicle_id) => {
    const vehicle = await db_1.db.query.VehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicle_id, vehicle_id),
    });
    return vehicle;
};
exports.getVehicleByIdService = getVehicleByIdService;
// Create vehicle
const createVehicleService = async (vehicle) => {
    await db_1.db.insert(schema_1.VehiclesTable).values(vehicle);
    return "Vehicle created successfully";
};
exports.createVehicleService = createVehicleService;
// Update vehicle
const updateVehicleService = async (vehicle_id, vehicle) => {
    await db_1.db.update(schema_1.VehiclesTable).set(vehicle).where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicle_id, vehicle_id));
    return "Vehicle updated successfully";
};
exports.updateVehicleService = updateVehicleService;
// Delete vehicle
const deleteVehicleService = async (vehicle_id) => {
    await db_1.db.delete(schema_1.VehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicle_id, vehicle_id));
    return "Vehicle deleted successfully";
};
exports.deleteVehicleService = deleteVehicleService;
