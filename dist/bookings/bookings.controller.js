"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.insertBooking = exports.getBookingById = exports.listAllBookings = void 0;
const booking_service_1 = require("./booking.service");
// List all bookings
const listAllBookings = async (c) => {
    try {
        const bookings = await (0, booking_service_1.bookingsService)();
        if (bookings === null)
            return c.text("No bookings found");
        return c.json(bookings, 200);
    }
    catch (error) {
        return c.text("Error while fetching bookings", 400);
    }
};
exports.listAllBookings = listAllBookings;
// Get booking by ID
const getBookingById = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const booking = await (0, booking_service_1.getBookingByIdService)(id);
        if (!booking) {
            return c.json({ message: 'Booking not found' }, 404);
        }
        return c.json(booking, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.getBookingById = getBookingById;
// Insert booking
const insertBooking = async (c) => {
    try {
        const booking = await c.req.json();
        const createdBooking = await (0, booking_service_1.insertBookingService)(booking);
        if (createdBooking === undefined) {
            return c.text("Error while inserting booking", 400);
        }
        return c.json(createdBooking, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertBooking = insertBooking;
// export const insertBooking = async (c: Context) => {
//     try {
//         const id = parseInt(c.req.param('id'), 10);
//         if (isNaN(id)) return c.text('Invalid id', 400);
//         const booking = await c.req.json();
//         const Booking = await insertBookingService(id, booking);
//         if (!insertBookingService) return c.text('User not updated', 400);
//         return c.json({message: "booking updated successfully"},200)
//     } catch (error: any) {
//          return  c.json({ error: error?.message }, 400);
//     }
// }
// Update booking
const updateBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const booking = await c.req.json();
    try {
        const existingBooking = await (0, booking_service_1.getBookingByIdService)(id);
        if (existingBooking === undefined)
            return c.text("Booking not found", 404);
        const updatedBooking = await (0, booking_service_1.updateBookingService)(id, booking);
        if (!updatedBooking)
            return c.text("Error while updating booking", 400);
        return c.json({ msg: updatedBooking }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateBooking = updateBooking;
// Delete booking
const deleteBooking = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const existingBooking = await (0, booking_service_1.getBookingByIdService)(id);
        if (existingBooking === undefined)
            return c.text("Booking not found", 404);
        const deletedBooking = await (0, booking_service_1.deleteBookingService)(id);
        return c.json({ msg: deletedBooking }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteBooking = deleteBooking;
