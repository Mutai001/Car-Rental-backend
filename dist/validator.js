"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.loginUserSchema = exports.authOnUsersSchema = exports.vehicleSpecificationSchema = exports.authSchema = exports.userSchema = void 0;
// validator.ts
const zod_1 = require("zod");
// User Schema
exports.userSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(1), // Ensures fullname is not empty
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    contact_phone: zod_1.z.string().optional(),
    phone_verified: zod_1.z.boolean().optional(),
    email_verified: zod_1.z.boolean().optional(),
    confirmation_code: zod_1.z.string().optional(),
});
// Define your authentication schema using Zod
exports.authSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(50),
    password: zod_1.z.string().min(6).max(100),
});
// Define the schema for vehicle specifications
exports.vehicleSpecificationSchema = zod_1.z.object({
    manufacturer: zod_1.z.string().min(1).max(100),
    model: zod_1.z.string().min(1).max(100),
    year: zod_1.z.number().int(),
    fuel_type: zod_1.z.string().min(1).max(50),
    engine_capacity: zod_1.z.string().min(1).max(50),
    transmission: zod_1.z.string().min(1).max(50),
    seating_capacity: zod_1.z.number().int(),
    color: zod_1.z.string().min(1).max(50),
    features: zod_1.z.string().min(1),
});
// Export other schemas as needed
// Extended User Schema for Auth
exports.authOnUsersSchema = exports.userSchema.extend({
    role: zod_1.z.string().optional(),
});
// Login User Schema
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
// Register User Schema
exports.registerUserSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional(),
});
