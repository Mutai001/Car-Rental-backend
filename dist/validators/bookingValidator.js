"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingValidator = void 0;
const zod_1 = require("zod");
exports.createBookingValidator = zod_1.z.object({
    user_id: zod_1.z.number(),
    vehicle_id: zod_1.z.number(),
    location_id: zod_1.z.number(),
    booking_date: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    return_date: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    total_amount: zod_1.z.number(),
    booking_status: zod_1.z.string().optional(),
});
