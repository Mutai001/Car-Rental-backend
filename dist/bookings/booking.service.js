"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingService = exports.updateBookingService = exports.insertBookingService = exports.getBookingByIdService = exports.bookingsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//get all bookings
const bookingsService = async () => {
    return await db_1.default.query.bookingsTable.findMany();
};
exports.bookingsService = bookingsService;
//get a specific booking by id
const getBookingByIdService = async (id) => {
    return await db_1.default.query.bookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingsTable.bookingId, id)
    });
};
exports.getBookingByIdService = getBookingByIdService;
// insertBookingService function adjusted to return the created booking
const insertBookingService = async (booking) => {
    const result = await db_1.default.insert(schema_1.bookingsTable).values(booking)
        .returning({ bookingId: schema_1.bookingsTable.bookingId, userId: schema_1.bookingsTable.userId, vehicle_id: schema_1.bookingsTable.vehicleId, location_id: schema_1.bookingsTable.locationId, bookingDate: schema_1.bookingsTable.bookingDate })
        .execute();
    if (result) {
        const createdBooking = result[0];
        return createdBooking;
    }
    else {
        throw new Error("Failed to insert booking");
    }
};
exports.insertBookingService = insertBookingService;
// export const insertBookingService = async (id: number, booking: BookingInsert) => {
//     await db.update(bookingsTable).set(booking).where(eq(bookingsTable.bookingId, id))
//     return "Booking updated successfully";
// }
//update booking
const updateBookingService = async (id, booking) => {
    await db_1.default.update(schema_1.bookingsTable).set(booking).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.bookingId, id));
    return "Booking updated successfully 🎉";
};
exports.updateBookingService = updateBookingService;
//delete booking
const deleteBookingService = async (id) => {
    await db_1.default.delete(schema_1.bookingsTable).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.bookingId, id));
    return "Booking deleted successfully 🎉";
};
exports.deleteBookingService = deleteBookingService;
