"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocationValidator = exports.createLocationValidator = void 0;
const zod_1 = require("zod");
// Define the schema for location
exports.createLocationValidator = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    address: zod_1.z.string().min(1, "Address is required"),
    contactPhone: zod_1.z.string().min(1, "Contact phone is required"),
});
// Define the schema for updating location
exports.updateLocationValidator = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    address: zod_1.z.string().min(1, "Address is required").optional(),
    contactPhone: zod_1.z.string().min(1, "Contact phone is required").optional(),
});
