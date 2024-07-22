"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingsData = exports.updateBookingsData = exports.createBookingsData = exports.getOneBookingsData = exports.getAllBookingsData = void 0;
const Booking_Service_1 = require("./Booking.Service");
const Booking_Service_2 = require("./Booking.Service");
// Get all bookings
const getAllBookingsData = async (c) => {
    try {
        //limit the number of bookings to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, Booking_Service_1.getAllBookings)(limit);
        if (data == null || data.length == 0) {
            return c.text("bookings not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getAllBookingsData = getAllBookingsData;
// fetch one bookings
const getOneBookingsData = async (c) => {
    const id = c.req.param("id");
    const bookings = await (0, Booking_Service_2.fetchOneBookings)(parseInt(id));
    if (bookings === undefined) {
        return c.json({ message: "No bookings found" }, 404);
    }
    return c.json(bookings, 200);
};
exports.getOneBookingsData = getOneBookingsData;
//create bookings
const createBookingsData = async (c, next) => {
    try {
        const bookings = await c.req.json();
        const response = await (0, Booking_Service_2.CreateBookings)(bookings);
        return c.json({ message: response }, 201);
    }
    catch (err) {
        return c.json({ message: err }, 500);
    }
};
exports.createBookingsData = createBookingsData;
//update bookings
const updateBookingsData = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Bookings = await c.req.json();
    try {
        // search for the bookings
        const searchedBookings = await (0, Booking_Service_1.getAllBookings)(id);
        if (searchedBookings == undefined)
            return c.text("bookings not found", 404);
        // get the data and update it
        const res = await (0, Booking_Service_2.UpdateBookings)(id, Bookings);
        // return a success message
        if (!res)
            return c.text("bookings not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBookingsData = updateBookingsData;
//delete bookings
// export const deleteBookingsData = async (c: Context) => {
//     const id = c.req.param("id")   
//     const response = await DeleteBookings(parseInt(id))
//     return c.json({message: response},200)
// }
const deleteBookingsData = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the Booking
        const Booking = await (0, Booking_Service_2.DeleteBookings)(id);
        if (Booking == undefined)
            return c.text("Booking not found", 404);
        //deleting the Booking
        const res = await (0, Booking_Service_2.DeleteBookings)(id);
        if (!res)
            return c.text("Booking not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBookingsData = deleteBookingsData;
