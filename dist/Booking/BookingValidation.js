"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBooking = void 0;
const VehicleAvailabilityService_1 = require("../Booking/VehicleAvailabilityService");
const validateBooking = async (booking) => {
    const isAvailable = await (0, VehicleAvailabilityService_1.checkVehicleAvailability)(booking.vehicle_id, booking.booking_date, booking.return_date);
    if (!isAvailable) {
        return { valid: false, message: "Vehicle is not available for the selected dates" };
    }
    return { valid: true, message: "Booking is valid" };
};
exports.validateBooking = validateBooking;
