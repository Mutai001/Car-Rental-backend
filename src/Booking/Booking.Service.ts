import { db } from "../drizzle/db";
import { TIBooking, TSBooking, BookingsTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all bookings
export const getAllBookings = async (limit?: number): Promise<TSBooking[] | null> => {
    if (limit) {
        return await db.query.BookingsTable.findMany({
            limit: limit
        });
    }
    return await db.query.BookingsTable.findMany();

}

// fetch one bookings
export const fetchOneBookings = async (id: number): Promise<TSBooking | undefined> => {
return await db.query.BookingsTable.findFirst({
    where: eq(BookingsTable.booking_id, id)
})
}

// create bookings
export const CreateBookings = async (bookings: TIBooking) => {
    await db.insert(BookingsTable).values(bookings)
    return "Bookings created successfully"
}

// update Bookings
    export const UpdateBookings = async (id: number, Booking: TIBooking) => {
    await db.update(BookingsTable).set(Booking).where(eq(BookingsTable.booking_id, id))
    return "Booking updated successfully";
}

 


// delete Bookings
// export const DeleteBookings = async (id: number) => {
//     await db.delete(BookingsTable).where(eq(BookingsTable.booking_id, id))
//     return "bookings deleted successfully"
// }

export const DeleteBookings = async (id: number) => {
    await db.delete(BookingsTable).where(eq(BookingsTable.booking_id, id))
    return "Booking deleted successfully";
}
