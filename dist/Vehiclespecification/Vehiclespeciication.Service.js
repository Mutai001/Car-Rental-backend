"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecificationService = exports.updateVehicleSpecificationService = exports.createVehicleSpecificationService = exports.getVehicleSpecificationByIdService = exports.getVehicleSpecificationsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// GET ALL VEHICLE SPECIFICATIONS
const getVehicleSpecificationsService = async () => {
    const vehicleSpecs = await db_1.db.query.VehicleSpecificationsTable.findMany();
    return vehicleSpecs;
};
exports.getVehicleSpecificationsService = getVehicleSpecificationsService;
// GET VEHICLE SPECIFICATION BY ID
const getVehicleSpecificationByIdService = async (id) => {
    const vehicleSpec = await db_1.db.query.VehicleSpecificationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpec_id, id)
    });
    return vehicleSpec;
};
exports.getVehicleSpecificationByIdService = getVehicleSpecificationByIdService;
// CREATE VEHICLE SPECIFICATION
const createVehicleSpecificationService = async (vehicleSpec) => {
    await db_1.db.insert(schema_1.VehicleSpecificationsTable).values(vehicleSpec);
    return "Vehicle specification created successfully";
};
exports.createVehicleSpecificationService = createVehicleSpecificationService;
// UPDATE VEHICLE SPECIFICATION
const updateVehicleSpecificationService = async (id, vehicleSpec) => {
    await db_1.db.update(schema_1.VehicleSpecificationsTable).set(vehicleSpec).where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpec_id, id));
    return "Vehicle specification updated successfully";
};
exports.updateVehicleSpecificationService = updateVehicleSpecificationService;
// DELETE VEHICLE SPECIFICATION
const deleteVehicleSpecificationService = async (id) => {
    await db_1.db.delete(schema_1.VehicleSpecificationsTable).where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpec_id, id));
    return "Vehicle specification deleted successfully";
};
exports.deleteVehicleSpecificationService = deleteVehicleSpecificationService;
