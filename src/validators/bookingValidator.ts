import { z } from 'zod';

export const createBookingValidator = z.object({
    user_id: z.number(),
    vehicle_id: z.number(),
    location_id: z.number(),
    booking_date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    return_date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    total_amount: z.number(),
    booking_status: z.string().optional(),
});
