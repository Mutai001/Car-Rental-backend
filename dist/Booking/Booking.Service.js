"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingService = exports.updateBookingService = exports.createBookingServiceWithTransaction = exports.getBookingByIdService = exports.getAllBookingsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all bookings
const getAllBookingsService = async () => {
    const bookings = await db_1.db.query.BookingsTable.findMany();
    return bookings;
};
exports.getAllBookingsService = getAllBookingsService;
// Get booking by ID
const getBookingByIdService = async (booking_id) => {
    const booking = await db_1.db.query.BookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.booking_id, booking_id),
    });
    return booking;
};
exports.getBookingByIdService = getBookingByIdService;
// Updated function to accept transaction
const createBookingServiceWithTransaction = async (booking, trx) => {
    await trx.insert(schema_1.BookingsTable).values(booking);
};
exports.createBookingServiceWithTransaction = createBookingServiceWithTransaction;
// Update booking
const updateBookingService = async (booking_id, booking) => {
    await db_1.db.update(schema_1.BookingsTable).set(booking).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.booking_id, booking_id));
    return "Booking updated successfully";
};
exports.updateBookingService = updateBookingService;
// Delete booking
const deleteBookingService = async (booking_id) => {
    await db_1.db.delete(schema_1.BookingsTable).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.booking_id, booking_id));
    return "Booking deleted successfully";
};
exports.deleteBookingService = deleteBookingService;
