"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Define the schema for creating a user
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    address: zod_1.z.string().optional(), // Add other fields as required
});
// Define the schema for updating a user
exports.updateUserSchema = zod_1.z.object({
    address: zod_1.z.string().optional(), // Add fields that are allowed to be updated
});
