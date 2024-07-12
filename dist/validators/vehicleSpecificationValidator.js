"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleSpecificationValidator = exports.createVehicleSpecificationValidator = void 0;
const zod_1 = require("zod");
// Define the schema for vehicle specification
exports.createVehicleSpecificationValidator = zod_1.z.object({
    manufacturer: zod_1.z.string().min(1, "Manufacturer is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    year: zod_1.z.number().int().positive("Year must be a positive integer"),
    fuelType: zod_1.z.string().min(1, "Fuel type is required"),
    engineCapacity: zod_1.z.number().positive("Engine capacity must be a positive number"),
    transmission: zod_1.z.string().min(1, "Transmission is required"),
    seatingCapacity: zod_1.z.number().int().positive("Seating capacity must be a positive integer"),
    color: zod_1.z.string().min(1, "Color is required"),
    features: zod_1.z.string().optional(),
});
// Define the schema for updating vehicle specification
exports.updateVehicleSpecificationValidator = zod_1.z.object({
    manufacturer: zod_1.z.string().min(1, "Manufacturer is required").optional(),
    model: zod_1.z.string().min(1, "Model is required").optional(),
    year: zod_1.z.number().int().positive("Year must be a positive integer").optional(),
    fuelType: zod_1.z.string().min(1, "Fuel type is required").optional(),
    engineCapacity: zod_1.z.number().positive("Engine capacity must be a positive number").optional(),
    transmission: zod_1.z.string().min(1, "Transmission is required").optional(),
    seatingCapacity: zod_1.z.number().int().positive("Seating capacity must be a positive integer").optional(),
    color: zod_1.z.string().min(1, "Color is required").optional(),
    features: zod_1.z.string().optional(),
});
