"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const hono_1 = require("hono");
const Booking_controller_1 = require("./Booking.controller");
exports.bookingRouter = new hono_1.Hono();
exports.bookingRouter
    .get("bookings", Booking_controller_1.getAllBookingsController)
    .get("bookings/:id", Booking_controller_1.getBookingByIdController)
    .post("bookings", Booking_controller_1.createBookingController)
    .put("bookings/:id", Booking_controller_1.updateBookingController)
    .delete("bookings/:id", Booking_controller_1.deleteBookingController);
exports.default = exports.bookingRouter;
