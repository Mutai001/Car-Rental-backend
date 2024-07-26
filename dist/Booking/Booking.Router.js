"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const hono_1 = require("hono");
const Booking_controller_1 = require("./Booking.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
exports.bookingRouter = new hono_1.Hono();
exports.bookingRouter
    .get("bookings", auth_middlewares_1.bothRoleAuth, Booking_controller_1.getAllBookingsData)
    .get("bookings/:id", auth_middlewares_1.bothRoleAuth, Booking_controller_1.getOneBookingsData)
    .post("bookings", auth_middlewares_1.userRoleAuth, Booking_controller_1.createBookingsData)
    .put("bookings/:id", auth_middlewares_1.bothRoleAuth, Booking_controller_1.updateBookingsData)
    .delete("bookings/:id", auth_middlewares_1.bothRoleAuth, Booking_controller_1.deleteBookingsData);
exports.default = exports.bookingRouter;
