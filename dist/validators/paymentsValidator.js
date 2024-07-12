"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentValidator = exports.createPaymentValidator = void 0;
const zod_1 = require("zod");
// Define the schema for payment
exports.createPaymentValidator = zod_1.z.object({
    bookingId: zod_1.z.number().min(1, "Booking ID is required"),
    amount: zod_1.z.number().min(0, "Amount must be positive"),
    paymentStatus: zod_1.z.string().min(1, "Payment status is required"),
    paymentDate: zod_1.z.string().min(1, "Payment date is required"),
    paymentMethod: zod_1.z.string().min(1, "Payment method is required"),
    transactionId: zod_1.z.string().min(1, "Transaction ID is required"),
});
// Define the schema for updating payment
exports.updatePaymentValidator = zod_1.z.object({
    bookingId: zod_1.z.number().min(1, "Booking ID is required").optional(),
    amount: zod_1.z.number().min(0, "Amount must be positive").optional(),
    paymentStatus: zod_1.z.string().min(1, "Payment status is required").optional(),
    paymentDate: zod_1.z.string().min(1, "Payment date is required").optional(),
    paymentMethod: zod_1.z.string().min(1, "Payment method is required").optional(),
    transactionId: zod_1.z.string().min(1, "Transaction ID is required").optional(),
});
