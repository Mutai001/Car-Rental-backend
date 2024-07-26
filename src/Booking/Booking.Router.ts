import { Hono } from 'hono';
import { getAllBookingsData, getOneBookingsData, createBookingsData, updateBookingsData, deleteBookingsData } from './Booking.controller';
import { adminRoleAuth,userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';

export const bookingRouter = new Hono();

bookingRouter
    .get("bookings",bothRoleAuth, getAllBookingsData)
    .get("bookings/:id", bothRoleAuth, getOneBookingsData)
    .post("bookings",userRoleAuth, createBookingsData)
    .put("bookings/:id",bothRoleAuth, updateBookingsData)
    .delete("bookings/:id",bothRoleAuth, deleteBookingsData);

export default bookingRouter;
