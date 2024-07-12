"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const hono_1 = require("hono");
const bookings_controller_1 = require("./bookings.controller");
const bookingValidator_1 = require("../validators/bookingValidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.bookingsRouter = new hono_1.Hono();
// Get all bookings
exports.bookingsRouter.get('/bookings', bookings_controller_1.listAllBookings);
// Get booking by ID
exports.bookingsRouter.get('/booking/:id', bookings_controller_1.getBookingById);
// Insert booking
exports.bookingsRouter.post('/bookings', (0, zod_validator_1.zValidator)('json', bookingValidator_1.createBookingValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), bookings_controller_1.insertBooking);
// Update booking
exports.bookingsRouter.put('/bookings/:id', bookings_controller_1.updateBooking);
// Delete booking
exports.bookingsRouter.delete('/bookings/:id', bookings_controller_1.deleteBooking);
