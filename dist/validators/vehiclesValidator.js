"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleValidator = exports.createVehicleValidator = void 0;
const zod_1 = require("zod");
// Define the schema for vehicle
exports.createVehicleValidator = zod_1.z.object({
    vehicleId: zod_1.z.number().int().positive("Vehicle ID must be a positive integer"),
    rentalRate: zod_1.z.number().positive("Rental rate must be a positive number"),
    availability: zod_1.z.boolean().default(true),
});
// Define the schema for updating vehicle
exports.updateVehicleValidator = zod_1.z.object({
    vehicleId: zod_1.z.number().int().positive("Vehicle ID must be a positive integer").optional(),
    rentalRate: zod_1.z.number().positive("Rental rate must be a positive number").optional(),
    availability: zod_1.z.boolean().optional(),
});
