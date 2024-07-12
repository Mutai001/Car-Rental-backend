"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVehicleAvailability = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const checkVehicleAvailability = async (vehicle_id, booking_date, return_date) => {
    const vehicle = await db_1.db.query.VehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicle_id, vehicle_id),
    });
    if (!vehicle || !vehicle.availability) {
        return false;
    }
    const overlappingBookings = await db_1.db.query.BookingsTable.findMany({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.BookingsTable.vehicle_id, vehicle_id), (0, drizzle_orm_1.or)((0, drizzle_orm_1.and)((0, drizzle_orm_1.gt)(schema_1.BookingsTable.booking_date, booking_date), (0, drizzle_orm_1.lt)(schema_1.BookingsTable.booking_date, return_date)), (0, drizzle_orm_1.and)((0, drizzle_orm_1.gt)(schema_1.BookingsTable.return_date, booking_date), (0, drizzle_orm_1.lt)(schema_1.BookingsTable.return_date, return_date))))
    });
    return overlappingBookings.length === 0;
};
exports.checkVehicleAvailability = checkVehicleAvailability;
