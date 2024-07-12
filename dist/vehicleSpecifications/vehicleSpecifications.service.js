"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecificationService = exports.updateVehicleSpecificationService = exports.insertVehicleSpecificationService = exports.getVehicleSpecificationByIdService = exports.vehicleSpecificationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const vehicleSpecificationsService = async () => {
    return await db_1.default.query.vehicleSpecificationsTable.findMany();
};
exports.vehicleSpecificationsService = vehicleSpecificationsService;
const getVehicleSpecificationByIdService = async (id) => {
    return await db_1.default.query.vehicleSpecificationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationsTable.vehicleId, id)
    });
};
exports.getVehicleSpecificationByIdService = getVehicleSpecificationByIdService;
// insertVehicleSpecificationService function adjusted to return the created vehicle specification
const insertVehicleSpecificationService = async (vehicleSpecification) => {
    const result = await db_1.default.insert(schema_1.vehicleSpecificationsTable).values(vehicleSpecification)
        .returning({ vehicle_id: schema_1.vehicleSpecificationsTable.vehicleId, manufacturer: schema_1.vehicleSpecificationsTable.manufacturer, model: schema_1.vehicleSpecificationsTable.model, year: schema_1.vehicleSpecificationsTable.year })
        .execute();
    if (result) {
        const createdVehicleSpecification = result[0];
        return createdVehicleSpecification;
    }
    else {
        throw new Error("Failed to insert vehicle specification");
    }
};
exports.insertVehicleSpecificationService = insertVehicleSpecificationService;
const updateVehicleSpecificationService = async (id, vehicleSpecification) => {
    await db_1.default.update(schema_1.vehicleSpecificationsTable).set(vehicleSpecification).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationsTable.vehicleId, id));
    return "Vehicle specification updated successfully 🎉";
};
exports.updateVehicleSpecificationService = updateVehicleSpecificationService;
const deleteVehicleSpecificationService = async (id) => {
    await db_1.default.delete(schema_1.vehicleSpecificationsTable).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationsTable.vehicleId, id));
    return "Vehicle specification deleted successfully 🎉";
};
exports.deleteVehicleSpecificationService = deleteVehicleSpecificationService;
