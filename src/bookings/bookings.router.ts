import { Hono } from "hono";
import { 
    deleteBooking, 
    getBookingById, 
    insertBooking, 
    listAllBookings, 
    updateBooking 
} from "./bookings.controller";
import { createBookingValidator } from '../validators/bookingValidator';
import { zValidator } from "@hono/zod-validator";

export const bookingsRouter = new Hono();

// Get all bookings
bookingsRouter.get('/bookings', listAllBookings);

// Get booking by ID
bookingsRouter.get('/booking/:id', getBookingById);

// Insert booking
bookingsRouter.post('/bookings', zValidator('json', createBookingValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertBooking);

// Update booking
bookingsRouter.put('/bookings/:id', updateBooking);

// Delete booking
bookingsRouter.delete('/bookings/:id', deleteBooking);
