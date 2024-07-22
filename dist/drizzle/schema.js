"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetRelations = exports.locationRelations = exports.customerSupportRelations = exports.paymentRelations = exports.bookingRelations = exports.vehicleRelations = exports.vehicleSpecRelations = exports.userBookingsRelations = exports.authRelations = exports.userAuthRelations = exports.FleetManagementTable = exports.LocationsTable = exports.CustomerSupportTicketsTable = exports.PaymentsTable = exports.BookingsTable = exports.VehiclesTable = exports.VehicleSpecificationsTable = exports.AuthOnUsersTable = exports.UsersTable = exports.paymentStatusEnum = exports.bookingStatusEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_orm_2 = require("drizzle-orm");
// Enums
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin"]);
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status", ["Pending", "Confirmed", "Cancelled"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", ["Pending", "Completed", "Failed"]);
// Users Table
exports.UsersTable = (0, pg_core_1.pgTable)("users", {
    user_id: (0, pg_core_1.serial)("user_id").primaryKey(),
    full_name: (0, pg_core_1.text)("full_name").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).notNull().unique(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 15 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 255 }).notNull(),
    role: (0, exports.roleEnum)("role").default("user"),
    // password: varchar("password", { length: 255 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Authentication Table
exports.AuthOnUsersTable = (0, pg_core_1.pgTable)("auth", {
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.UsersTable.user_id).notNull(),
    username: (0, pg_core_1.varchar)("username", { length: 50 }).notNull().unique(),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).notNull().unique(), // Add email field
    role: (0, exports.roleEnum)("role").default("user"), // Adding role field
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
exports.VehicleSpecificationsTable = (0, pg_core_1.pgTable)('vehicle_specifications', {
    vehicle_id: (0, pg_core_1.serial)('vehicle_id').primaryKey(),
    manufacturer: (0, pg_core_1.varchar)('manufacturer', { length: 255 }).notNull(),
    model: (0, pg_core_1.varchar)('model', { length: 255 }).notNull(),
    year: (0, pg_core_1.integer)('year').notNull(),
    fuel_type: (0, pg_core_1.varchar)('fuel_type', { length: 50 }).notNull(),
    engine_capacity: (0, pg_core_1.varchar)('engine_capacity', { length: 50 }),
    transmission: (0, pg_core_1.varchar)('transmission', { length: 50 }),
    seating_capacity: (0, pg_core_1.integer)('seating_capacity'),
    color: (0, pg_core_1.varchar)('color', { length: 50 }),
    features: (0, pg_core_1.text)('features'),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Vehicles Table
exports.VehiclesTable = (0, pg_core_1.pgTable)('vehicles', {
    vehicle_id: (0, pg_core_1.serial)('vehicle_id').primaryKey(),
    vehicleSpec_id: (0, pg_core_1.integer)('vehicleSpec_id').references(() => exports.VehicleSpecificationsTable.vehicle_id, { onDelete: 'cascade' }),
    rental_rate: (0, pg_core_1.decimal)('rental_rate').notNull(),
    availability: (0, pg_core_1.boolean)('availability').default(true),
    vehicle_image: (0, pg_core_1.varchar)('vehicle_image', { length: 255 }),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Bookings Table
exports.BookingsTable = (0, pg_core_1.pgTable)("bookings", {
    booking_id: (0, pg_core_1.serial)("booking_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.UsersTable.user_id).notNull(),
    vehicle_id: (0, pg_core_1.integer)("vehicle_id").references(() => exports.VehiclesTable.vehicle_id, { onDelete: "cascade" }),
    location_id: (0, pg_core_1.integer)("location_id").references(() => exports.LocationsTable.location_id, { onDelete: "cascade" }),
    booking_date: (0, pg_core_1.date)("booking_date").notNull(),
    return_date: (0, pg_core_1.date)("return_date").notNull(),
    total_amount: (0, pg_core_1.decimal)("total_amount", { precision: 10, scale: 2 }).notNull(),
    booking_status: (0, exports.bookingStatusEnum)("booking_status").default("Pending"),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Payments Table
exports.PaymentsTable = (0, pg_core_1.pgTable)("payments", {
    payment_id: (0, pg_core_1.serial)("payment_id").primaryKey(),
    booking_id: (0, pg_core_1.integer)("booking_id").references(() => exports.BookingsTable.booking_id, { onDelete: "cascade" }),
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 }).notNull(),
    payment_status: (0, exports.paymentStatusEnum)("payment_status").default("Pending"),
    payment_date: (0, pg_core_1.date)("payment_date").notNull(),
    payment_method: (0, pg_core_1.varchar)("payment_method", { length: 50 }).notNull(),
    transaction_id: (0, pg_core_1.varchar)("transaction_id", { length: 100 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Customer Support Tickets Table
exports.CustomerSupportTicketsTable = (0, pg_core_1.pgTable)("customer_support_tickets", {
    ticket_id: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.UsersTable.user_id, { onDelete: "cascade" }),
    subject: (0, pg_core_1.varchar)("subject", { length: 100 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Locations Table
exports.LocationsTable = (0, pg_core_1.pgTable)("locations", {
    location_id: (0, pg_core_1.serial)("location_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 255 }).notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 15 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
// Fleet Management Table
exports.FleetManagementTable = (0, pg_core_1.pgTable)("fleet_management", {
    fleet_id: (0, pg_core_1.serial)("fleet_id").primaryKey(),
    vehicle_id: (0, pg_core_1.integer)("vehicle_id").references(() => exports.VehiclesTable.vehicle_id, { onDelete: 'cascade' }),
    acquisition_date: (0, pg_core_1.date)("acquisition_date").notNull(),
    depreciation_rate: (0, pg_core_1.decimal)("depreciation_rate", { precision: 10, scale: 2 }).notNull(),
    current_value: (0, pg_core_1.decimal)("current_value", { precision: 10, scale: 2 }).notNull(),
    maintenance_cost: (0, pg_core_1.decimal)("maintenance_cost", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updated_at: (0, pg_core_1.date)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
exports.userAuthRelations = (0, drizzle_orm_2.relations)(exports.UsersTable, ({ one }) => ({
    auth: one(exports.AuthOnUsersTable, {
        fields: [exports.UsersTable.user_id],
        references: [exports.AuthOnUsersTable.user_id]
    })
}));
exports.authRelations = (0, drizzle_orm_2.relations)(exports.AuthOnUsersTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.AuthOnUsersTable.user_id],
        references: [exports.UsersTable.user_id]
    })
}));
exports.userBookingsRelations = (0, drizzle_orm_2.relations)(exports.UsersTable, ({ many }) => ({
    bookings: many(exports.BookingsTable),
    supportTickets: many(exports.CustomerSupportTicketsTable),
}));
exports.vehicleSpecRelations = (0, drizzle_orm_2.relations)(exports.VehicleSpecificationsTable, ({ one, many }) => ({
    vehicles: many(exports.VehiclesTable),
    fleet: one(exports.FleetManagementTable, {
        fields: [exports.VehicleSpecificationsTable.vehicle_id],
        references: [exports.FleetManagementTable.vehicle_id]
    })
}));
exports.vehicleRelations = (0, drizzle_orm_2.relations)(exports.VehiclesTable, ({ one }) => ({
    vehicleSpec: one(exports.VehicleSpecificationsTable, {
        fields: [exports.VehiclesTable.vehicle_id],
        references: [exports.VehicleSpecificationsTable.vehicle_id]
    }),
    bookings: one(exports.BookingsTable, {
        fields: [exports.VehiclesTable.vehicleSpec_id],
        references: [exports.BookingsTable.vehicle_id]
    })
}));
exports.bookingRelations = (0, drizzle_orm_2.relations)(exports.BookingsTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.BookingsTable.user_id],
        references: [exports.UsersTable.user_id]
    }),
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.BookingsTable.vehicle_id],
        references: [exports.VehiclesTable.vehicle_id]
    }),
    location: one(exports.LocationsTable, {
        fields: [exports.BookingsTable.location_id],
        references: [exports.LocationsTable.location_id]
    }),
    payments: one(exports.PaymentsTable, {
        fields: [exports.BookingsTable.booking_id],
        references: [exports.PaymentsTable.booking_id]
    })
}));
exports.paymentRelations = (0, drizzle_orm_2.relations)(exports.PaymentsTable, ({ one }) => ({
    booking: one(exports.BookingsTable, {
        fields: [exports.PaymentsTable.booking_id],
        references: [exports.BookingsTable.booking_id]
    })
}));
exports.customerSupportRelations = (0, drizzle_orm_2.relations)(exports.CustomerSupportTicketsTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.CustomerSupportTicketsTable.user_id],
        references: [exports.UsersTable.user_id]
    })
}));
exports.locationRelations = (0, drizzle_orm_2.relations)(exports.LocationsTable, ({ many }) => ({
    bookings: many(exports.BookingsTable)
}));
exports.fleetRelations = (0, drizzle_orm_2.relations)(exports.FleetManagementTable, ({ one }) => ({
    vehicleSpec: one(exports.VehicleSpecificationsTable, {
        fields: [exports.FleetManagementTable.vehicle_id],
        references: [exports.VehicleSpecificationsTable.vehicle_id]
    })
}));
