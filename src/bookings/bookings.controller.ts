import { Context } from "hono";
import { 
    bookingsService, 
    deleteBookingService, 
    getBookingByIdService, 
    insertBookingService, 
    updateBookingService 
} from "./booking.service";

// List all bookings
export const listAllBookings = async (c: Context) => {
    try {
        const bookings = await bookingsService();
        if (bookings === null) return c.text("No bookings found");
        return c.json(bookings, 200);
    } catch (error: any) {
        return c.text("Error while fetching bookings", 400);
    }
}

// Get booking by ID
export const getBookingById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const booking = await getBookingByIdService(id);
        if (booking === undefined) return c.text("Booking not found 😒", 404);
        return c.json(booking, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert booking
export const insertBooking = async (c: Context) => {
    try {
        const booking = await c.req.json();
        const createdBooking = await insertBookingService(booking);
        if (createdBooking === undefined) {
            return c.text("Error while inserting booking", 400);
        }
        return c.json(createdBooking, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update booking
export const updateBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const booking = await c.req.json();
    try {
        const existingBooking = await getBookingByIdService(id);
        if (existingBooking === undefined) return c.text("Booking not found", 404);
        const updatedBooking = await updateBookingService(id, booking);
        if (!updatedBooking) return c.text("Error while updating booking", 400);
        return c.json({ msg: updatedBooking }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete booking
export const deleteBooking = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingBooking = await getBookingByIdService(id);
        if (existingBooking === undefined) return c.text("Booking not found", 404);
        const deletedBooking = await deleteBookingService(id);
        return c.json({ msg: deletedBooking }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
