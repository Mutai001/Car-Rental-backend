import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { BookingInsert, BookingSelect, bookingsTable } from "../drizzle/schema";

export const bookingsService = async (): Promise<BookingSelect[] | null> => {
    return await db.query.bookingsTable.findMany();
}

export const getBookingByIdService = async (id: number): Promise<BookingSelect | undefined> => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.bookingId, id)
    });
}

// insertBookingService function adjusted to return the created booking
export const insertBookingService = async (booking: BookingInsert) => {
    const result = await db.insert(bookingsTable).values(booking)
        .returning({ bookingId: bookingsTable.bookingId, userId: bookingsTable.userId, vehicle_id: bookingsTable.vehicleId, location_id: bookingsTable.locationId, bookingDate: bookingsTable.bookingDate })
        .execute();

    if (result) {
        const createdBooking = result[0];
        return createdBooking;
    } else {
        throw new Error("Failed to insert booking");
    }
}

export const updateBookingService = async (id: number, booking: BookingInsert) => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.bookingId, id));
    return "Booking updated successfully 🎉";
}

export const deleteBookingService = async (id: number) => {
    await db.delete(bookingsTable).where(eq(bookingsTable.bookingId, id));
    return "Booking deleted successfully 🎉";
}
