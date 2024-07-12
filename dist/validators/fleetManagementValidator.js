"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFleetManagementValidator = exports.createFleetManagementValidator = void 0;
const zod_1 = require("zod");
// Define the schema for fleet management
exports.createFleetManagementValidator = zod_1.z.object({
    vehicleId: zod_1.z.number().int().positive("Vehicle ID must be a positive integer"),
    acquisitionDate: zod_1.z.string().min(1, "Acquisition date is required"),
    depreciationRate: zod_1.z.number().nonnegative("Depreciation rate must be non-negative"),
    currentValue: zod_1.z.number().nonnegative("Current value must be non-negative"),
    maintenanceCost: zod_1.z.number().nonnegative("Maintenance cost must be non-negative"),
    status: zod_1.z.string().min(1, "Status is required"),
});
// Define the schema for updating fleet management
exports.updateFleetManagementValidator = zod_1.z.object({
    vehicleId: zod_1.z.number().int().positive("Vehicle ID must be a positive integer").optional(),
    acquisitionDate: zod_1.z.string().min(1, "Acquisition date is required").optional(),
    depreciationRate: zod_1.z.number().nonnegative("Depreciation rate must be non-negative").optional(),
    currentValue: zod_1.z.number().nonnegative("Current value must be non-negative").optional(),
    maintenanceCost: zod_1.z.number().nonnegative("Maintenance cost must be non-negative").optional(),
    status: zod_1.z.string().min(1, "Status is required").optional(),
});
