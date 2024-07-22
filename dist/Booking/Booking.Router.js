"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const hono_1 = require("hono");
const Booking_controller_1 = require("./Booking.controller");
exports.bookingRouter = new hono_1.Hono();
exports.bookingRouter
    .get("bookings", Booking_controller_1.getAllBookingsData)
    .get("bookings/:id", Booking_controller_1.getOneBookingsData)
    .post("bookings", Booking_controller_1.createBookingsData)
    .put("bookings/:id", Booking_controller_1.updateBookingsData)
    .delete("bookings/:id", Booking_controller_1.deleteBookingsData);
exports.default = exports.bookingRouter;
