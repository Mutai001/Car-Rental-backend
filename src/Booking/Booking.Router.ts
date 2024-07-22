import { Hono } from 'hono';
import { getAllBookingsData, getOneBookingsData, createBookingsData, updateBookingsData, deleteBookingsData } from './Booking.controller';

export const bookingRouter = new Hono();

bookingRouter
    .get("bookings", getAllBookingsData)
    .get("bookings/:id", getOneBookingsData)
    .post("bookings", createBookingsData)
    .put("bookings/:id", updateBookingsData)
    .delete("bookings/:id", deleteBookingsData);

export default bookingRouter;
