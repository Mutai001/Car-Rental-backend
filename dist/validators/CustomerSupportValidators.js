"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerSupportTicketValidator = exports.createCustomerSupportTicketValidator = void 0;
const zod_1 = require("zod");
// Define the schema for customer support ticket
exports.createCustomerSupportTicketValidator = zod_1.z.object({
    userId: zod_1.z.number().int().positive("User ID must be a positive integer"),
    subject: zod_1.z.string().min(1, "Subject is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    status: zod_1.z.string().min(1, "Status is required"),
});
// Define the schema for updating customer support ticket
exports.updateCustomerSupportTicketValidator = zod_1.z.object({
    userId: zod_1.z.number().int().positive("User ID must be a positive integer").optional(),
    subject: zod_1.z.string().min(1, "Subject is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    status: zod_1.z.string().min(1, "Status is required").optional(),
});
