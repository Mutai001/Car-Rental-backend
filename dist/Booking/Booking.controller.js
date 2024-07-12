"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.createBookingController = exports.getBookingByIdController = exports.getAllBookingsController = void 0;
const Booking_Service_1 = require("./Booking.Service");
const TransactionService_1 = require("./TransactionService");
const VehicleAvailabilityService_1 = require("./VehicleAvailabilityService");
const BookingValidation_1 = require("./BookingValidation");
// Get all bookings
const getAllBookingsController = async (c) => {
    try {
        const bookings = await (0, Booking_Service_1.getAllBookingsService)();
        if (!bookings || bookings.length === 0) {
            return c.text('No bookings found', 404);
        }
        return c.json(bookings, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAllBookingsController = getAllBookingsController;
// Get booking by ID
const getBookingByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) {
            return c.text('Invalid id', 400);
        }
        const booking = await (0, Booking_Service_1.getBookingByIdService)(id);
        if (!booking) {
            return c.text('Booking not found', 404);
        }
        return c.json(booking, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getBookingByIdController = getBookingByIdController;
const createBookingController = async (c) => {
    try {
        const booking = await c.req.json();
        console.log("Creating Booking");
        // Step 1: Validate Booking
        console.log("Proceeding to validate booking...");
        const validation = await (0, BookingValidation_1.validateBooking)(booking);
        if (!validation.valid) {
            console.log("Booking validation failed:", validation.message);
            return c.text(validation.message, 400);
        }
        // Step 2: Check Vehicle Availability
        console.log("Proceeding to check vehicle availability...");
        const isAvailable = await (0, VehicleAvailabilityService_1.checkVehicleAvailability)(booking.vehicle_id, booking.booking_date, booking.return_date);
        if (!isAvailable) {
            console.log("Vehicle is not available for the selected dates.");
            return c.text('Vehicle is not available for the selected dates', 400);
        }
        // Step 3: Manage Booking Transaction (includes booking creation and payment processing)
        console.log("Booking validated. Proceeding to manage booking transaction...");
        const transactionResult = await (0, TransactionService_1.manageBookingTransaction)(booking);
        if (!transactionResult.success) {
            console.error("Booking failed due to payment processing failure:", transactionResult.message);
            return c.text(transactionResult.message, 400);
        }
        // Final response
        console.log("Booking and payment processed successfully.");
        return c.json({ message: 'Booking created and payment processed successfully' }, 201);
    }
    catch (error) {
        console.error("Error creating booking:", error.message || error);
        return c.json({ error: error?.message }, 500);
    }
};
exports.createBookingController = createBookingController;
// Update booking
const updateBookingController = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) {
            return c.text('Invalid id', 400);
        }
        const booking = await c.req.json();
        const updatedBooking = await (0, Booking_Service_1.updateBookingService)(id, booking);
        if (!updatedBooking) {
            return c.text('Booking not updated', 400);
        }
        return c.json({ message: 'Booking updated successfully' }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateBookingController = updateBookingController;
// Delete booking
const deleteBookingController = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) {
            return c.text('Invalid id', 400);
        }
        const deletedBooking = await (0, Booking_Service_1.deleteBookingService)(id);
        if (!deletedBooking) {
            return c.text('Booking not deleted', 400);
        }
        return c.json({ message: 'Booking deleted successfully' }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteBookingController = deleteBookingController;
