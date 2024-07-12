"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementSchema = exports.locationSchema = exports.customerSupportTicketSchema = exports.authenticationSchema = exports.paymentSchema = exports.bookingSchema = exports.vehicleSchema = exports.vehicleSpecificationSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
// Enums
const userRoleEnum = zod_1.z.enum(['user', 'admin']);
// 1. Users Schema
exports.userSchema = zod_1.z.object({
    userId: zod_1.z.number().optional(),
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contactPhone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    role: userRoleEnum.default('user'),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 2. Vehicle Specifications Schema
exports.vehicleSpecificationSchema = zod_1.z.object({
    vehicleId: zod_1.z.number().optional(),
    manufacturer: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number(),
    fuelType: zod_1.z.string(),
    engineCapacity: zod_1.z.number(),
    transmission: zod_1.z.string(),
    seatingCapacity: zod_1.z.number(),
    color: zod_1.z.string(),
    features: zod_1.z.string().optional(),
});
// 3. Vehicles Schema
exports.vehicleSchema = zod_1.z.object({
    vehicleSpecId: zod_1.z.number().optional(),
    vehicleId: zod_1.z.number(),
    rentalRate: zod_1.z.number(),
    availability: zod_1.z.boolean(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 4. Bookings Schema
exports.bookingSchema = zod_1.z.object({
    bookingId: zod_1.z.number().optional(),
    userId: zod_1.z.number(),
    vehicleId: zod_1.z.number(),
    locationId: zod_1.z.number(),
    bookingDate: zod_1.z.date(),
    returnDate: zod_1.z.date(),
    totalAmount: zod_1.z.number(),
    bookingStatus: zod_1.z.string().default('Pending'),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 5. Payments Schema
exports.paymentSchema = zod_1.z.object({
    paymentId: zod_1.z.number().optional(),
    bookingId: zod_1.z.number(),
    amount: zod_1.z.number(),
    paymentStatus: zod_1.z.string().default('Pending'),
    paymentDate: zod_1.z.date(),
    paymentMethod: zod_1.z.string(),
    transactionId: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 6. Authentication Schema
exports.authenticationSchema = zod_1.z.object({
    authId: zod_1.z.number().optional(),
    userId: zod_1.z.number(),
    password: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 7. Customer Support Tickets Schema
exports.customerSupportTicketSchema = zod_1.z.object({
    ticketId: zod_1.z.number().optional(),
    userId: zod_1.z.number(),
    subject: zod_1.z.string(),
    description: zod_1.z.string(),
    status: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 8. Locations Schema
exports.locationSchema = zod_1.z.object({
    locationId: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    contactPhone: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
// 9. Fleet Management Schema
exports.fleetManagementSchema = zod_1.z.object({
    fleetId: zod_1.z.number().optional(),
    vehicleId: zod_1.z.number(),
    acquisitionDate: zod_1.z.date(),
    depreciationRate: zod_1.z.number(),
    currentValue: zod_1.z.number(),
    maintenanceCost: zod_1.z.number(),
    status: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
