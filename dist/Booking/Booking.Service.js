"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBookings = exports.UpdateBookings = exports.CreateBookings = exports.fetchOneBookings = exports.getAllBookings = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all bookings
const getAllBookings = async (limit) => {
    if (limit) {
        return await db_1.db.query.BookingsTable.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.BookingsTable.findMany();
};
exports.getAllBookings = getAllBookings;
// fetch one bookings
const fetchOneBookings = async (id) => {
    return await db_1.db.query.BookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.booking_id, id)
    });
};
exports.fetchOneBookings = fetchOneBookings;
// create bookings
const CreateBookings = async (bookings) => {
    await db_1.db.insert(schema_1.BookingsTable).values(bookings);
    return "Bookings created successfully";
};
exports.CreateBookings = CreateBookings;
// update Bookings
const UpdateBookings = async (id, Booking) => {
    await db_1.db.update(schema_1.BookingsTable).set(Booking).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.booking_id, id));
    return "Booking updated successfully";
};
exports.UpdateBookings = UpdateBookings;
// delete Bookings
// export const DeleteBookings = async (id: number) => {
//     await db.delete(BookingsTable).where(eq(BookingsTable.booking_id, id))
//     return "bookings deleted successfully"
// }
const DeleteBookings = async (id) => {
    await db_1.db.delete(schema_1.BookingsTable).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.booking_id, id));
    return "Booking deleted successfully";
};
exports.DeleteBookings = DeleteBookings;
