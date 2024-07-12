"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRelations = exports.locationsRelations = exports.customerSupportTicketsRelations = exports.authenticationRelations = exports.paymentsRelations = exports.bookingsRelations = exports.vehicleSpecificationsRelations = exports.vehiclesRelations = exports.usersRelations = exports.fleetManagementTable = exports.locationsTable = exports.customerSupportTicketsTable = exports.paymentsTable = exports.bookingsTable = exports.vehicleSpecificationsTable = exports.vehiclesTable = exports.authenticationTable = exports.usersTable = exports.paymentStatusEnum = exports.bookingStatusEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_orm_2 = require("drizzle-orm");
// Enums
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin"]);
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status", ["Pending", "Confirmed", "Cancelled"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", ["Pending", "Completed", "Failed"]);
// Users Table
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.serial)("user_id").primaryKey(),
    fullName: (0, pg_core_1.text)("full_name").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).notNull().unique(),
    contactPhone: (0, pg_core_1.varchar)("contact_phone", { length: 15 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 255 }).notNull(),
    role: (0, exports.roleEnum)("role").default("user"),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Authentication Table
exports.authenticationTable = (0, pg_core_1.pgTable)("auth", {
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.userId).notNull(),
    username: (0, pg_core_1.varchar)("username", { length: 50 }).notNull().unique(),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).notNull().unique(),
    role: (0, exports.roleEnum)("role").default("user"),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Vehicles Table
exports.vehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    vehicleId: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    vehicleSpecId: (0, pg_core_1.integer)("vehicle_spec_id").references(() => exports.vehicleSpecificationsTable.vehicleId).notNull().unique(), // Add unique constraint
    rentalRate: (0, pg_core_1.decimal)("rental_rate", { precision: 10, scale: 2 }).notNull(),
    availability: (0, pg_core_1.boolean)("availability").default(true),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Vehicle Specifications Table
exports.vehicleSpecificationsTable = (0, pg_core_1.pgTable)("vehicle_specifications", {
    vehicleId: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 100 }).notNull(),
    model: (0, pg_core_1.varchar)("model", { length: 100 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    fuelType: (0, pg_core_1.varchar)("fuel_type", { length: 50 }).notNull(),
    engineCapacity: (0, pg_core_1.varchar)("engine_capacity", { length: 50 }).notNull(),
    transmission: (0, pg_core_1.varchar)("transmission", { length: 50 }).notNull(),
    seatingCapacity: (0, pg_core_1.integer)("seating_capacity").notNull(),
    color: (0, pg_core_1.varchar)("color", { length: 50 }).notNull(),
    features: (0, pg_core_1.text)("features").notNull()
});
// Bookings Table
exports.bookingsTable = (0, pg_core_1.pgTable)("bookings", {
    bookingId: (0, pg_core_1.serial)("booking_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.userId).notNull(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").references(() => exports.vehiclesTable.vehicleId).notNull(),
    locationId: (0, pg_core_1.integer)("location_id").references(() => exports.locationsTable.locationId).notNull(),
    bookingDate: (0, pg_core_1.date)("booking_date").notNull(),
    returnDate: (0, pg_core_1.date)("return_date").notNull(),
    totalAmount: (0, pg_core_1.decimal)("total_amount", { precision: 10, scale: 2 }).notNull(),
    bookingStatus: (0, exports.bookingStatusEnum)("booking_status").default("Pending"),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Payments Table
exports.paymentsTable = (0, pg_core_1.pgTable)("payments", {
    paymentId: (0, pg_core_1.serial)("payment_id").primaryKey(),
    bookingId: (0, pg_core_1.integer)("booking_id").references(() => exports.bookingsTable.bookingId).notNull(),
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 }).notNull(),
    paymentStatus: (0, exports.paymentStatusEnum)("payment_status").default("Pending"),
    paymentDate: (0, pg_core_1.date)("payment_date").notNull(),
    paymentMethod: (0, pg_core_1.varchar)("payment_method", { length: 50 }).notNull(),
    transactionId: (0, pg_core_1.varchar)("transaction_id", { length: 100 }).notNull(),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Customer Support Tickets Table
exports.customerSupportTicketsTable = (0, pg_core_1.pgTable)("customer_support_tickets", {
    ticketId: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.userId).notNull(),
    subject: (0, pg_core_1.varchar)("subject", { length: 100 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Locations Table
exports.locationsTable = (0, pg_core_1.pgTable)("locations", {
    locationId: (0, pg_core_1.serial)("location_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 255 }).notNull(),
    contactPhone: (0, pg_core_1.varchar)("contact_phone", { length: 15 }).notNull(),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Fleet Management Table
exports.fleetManagementTable = (0, pg_core_1.pgTable)("fleet_management", {
    fleetId: (0, pg_core_1.serial)("fleet_id").primaryKey(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").references(() => exports.vehiclesTable.vehicleId).notNull(),
    acquisitionDate: (0, pg_core_1.date)("acquisition_date").notNull(),
    depreciationRate: (0, pg_core_1.decimal)("depreciation_rate", { precision: 10, scale: 2 }).notNull(),
    currentValue: (0, pg_core_1.decimal)("current_value", { precision: 10, scale: 2 }).notNull(),
    maintenanceCost: (0, pg_core_1.decimal)("maintenance_cost", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    createdAt: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Relations
exports.usersRelations = (0, drizzle_orm_2.relations)(exports.usersTable, ({ many, one }) => ({
    bookings: many(exports.bookingsTable),
    authentication: one(exports.authenticationTable),
    supportTickets: many(exports.customerSupportTicketsTable),
}));
exports.vehiclesRelations = (0, drizzle_orm_2.relations)(exports.vehiclesTable, ({ one }) => ({
    specification: one(exports.vehicleSpecificationsTable, {
        fields: [exports.vehiclesTable.vehicleSpecId],
        references: [exports.vehicleSpecificationsTable.vehicleId],
    }),
}));
exports.vehicleSpecificationsRelations = (0, drizzle_orm_2.relations)(exports.vehicleSpecificationsTable, ({ many }) => ({
    bookings: many(exports.bookingsTable),
    fleetManagement: many(exports.fleetManagementTable),
}));
exports.bookingsRelations = (0, drizzle_orm_2.relations)(exports.bookingsTable, ({ one, many }) => ({
    user: one(exports.usersTable, {
        fields: [exports.bookingsTable.userId],
        references: [exports.usersTable.userId],
    }),
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.bookingsTable.vehicleId],
        references: [exports.vehiclesTable.vehicleId],
    }),
    location: one(exports.locationsTable, {
        fields: [exports.bookingsTable.locationId],
        references: [exports.locationsTable.locationId],
    }),
    payments: many(exports.paymentsTable),
}));
exports.paymentsRelations = (0, drizzle_orm_2.relations)(exports.paymentsTable, ({ one }) => ({
    booking: one(exports.bookingsTable, {
        fields: [exports.paymentsTable.bookingId],
        references: [exports.bookingsTable.bookingId],
    }),
}));
exports.authenticationRelations = (0, drizzle_orm_2.relations)(exports.authenticationTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.authenticationTable.userId],
        references: [exports.usersTable.userId],
    }),
}));
exports.customerSupportTicketsRelations = (0, drizzle_orm_2.relations)(exports.customerSupportTicketsTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.customerSupportTicketsTable.userId],
        references: [exports.usersTable.userId],
    }),
}));
exports.locationsRelations = (0, drizzle_orm_2.relations)(exports.locationsTable, ({ many }) => ({
    bookings: many(exports.bookingsTable),
}));
exports.fleetManagementRelations = (0, drizzle_orm_2.relations)(exports.fleetManagementTable, ({ one }) => ({
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.fleetManagementTable.vehicleId],
        references: [exports.vehiclesTable.vehicleId],
    }),
}));
