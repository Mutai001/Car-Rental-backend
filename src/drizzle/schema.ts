import { pgTable, serial, text, varchar, timestamp, pgEnum, boolean, integer, numeric, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

// 1. usersTable Table
export const usersTable = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  address: text('address'),
  role: userRoleEnum('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 2. Vehicle Specifications Table
export const vehicleSpecificationsTable = pgTable('vehicle_specifications', {
  vehicleId: serial('vehicle_id').primaryKey(),
  manufacturer: varchar('manufacturer', { length: 100 }),
  model: varchar('model', { length: 100 }),
  year: integer('year'),
  fuelType: varchar('fuel_type', { length: 50 }),
  engineCapacity: numeric('engine_capacity'),
  transmission: varchar('transmission', { length: 50 }),
  seatingCapacity: integer('seating_capacity'),
  color: varchar('color', { length: 50 }),
  features: text('features'),
});

// 3. VehiclesTable
export const VehiclesTable = pgTable('vehicles', {
  vehicleSpecId: serial('vehicle_spec_id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => vehicleSpecificationsTable.vehicleId),
  rentalRate: numeric('rental_rate'),
  availability: boolean('availability'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. Bookings Table
export const bookingsTable = pgTable('bookings', {
  bookingId: serial('booking_id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.userId),
  vehicleId: integer('vehicle_id').references(() => vehicleSpecificationsTable.vehicleId),
  locationId: integer('location_id').references(() => locationsTable.locationId),
  bookingDate: date('booking_date'),
  returnDate: date('return_date'),
  totalAmount: numeric('total_amount'),
  bookingStatus: varchar('booking_status', { length: 20 }).default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 5. Payments Table
export const paymentsTable = pgTable('payments', {
  paymentId: serial('payment_id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookingsTable.bookingId),
  amount: numeric('amount'),
  paymentStatus: varchar('payment_status', { length: 20 }).default('Pending'),
  paymentDate: timestamp('payment_date'),
  paymentMethod: varchar('payment_method', { length: 50 }),
  transactionId: varchar('transaction_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 6. Authentication Table
export const authenticationTable = pgTable('authentication', {
  authId: serial('auth_id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.userId),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 7. Customer Support Tickets Table
export const customerSupportTicketsTable = pgTable('customer_support_tickets', {
  ticketId: serial('ticket_id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.userId),
  subject: varchar('subject', { length: 255 }),
  description: text('description'),
  status: varchar('status', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 8. Locations Table
export const locationsTable = pgTable('locations', {
  locationId: serial('location_id').primaryKey(),
  name: varchar('name', { length: 100 }),
  address: text('address'),
  contactPhone: varchar('contact_phone', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 9. Fleet Management Table
export const fleetManagementTable = pgTable('fleet_management', {
  fleetId: serial('fleet_id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => vehicleSpecificationsTable.vehicleId),
  acquisitionDate: date('acquisition_date'),
  depreciationRate: numeric('depreciation_rate'),
  currentValue: numeric('current_value'),
  maintenanceCost: numeric('maintenance_cost'),
  status: varchar('status', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many, one }) => ({
  bookings: many(bookingsTable),
  authentication: one(authenticationTable),
  supportTickets: many(customerSupportTicketsTable),
}));

export const vehiclesRelations = relations(VehiclesTable, ({ one }) => ({
  specification: one(vehicleSpecificationsTable, {
    fields: [VehiclesTable.vehicleId],
    references: [vehicleSpecificationsTable.vehicleId],
  }),
}));

export const vehicleSpecificationsTableRelations = relations(vehicleSpecificationsTable, ({ many }) => ({
  bookings: many(bookingsTable),
  fleetManagement: many(fleetManagementTable),
}));

export const bookingsRelations = relations(bookingsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [bookingsTable.userId],
    references: [usersTable.userId],
  }),
  vehicle: one(vehicleSpecificationsTable, {
    fields: [bookingsTable.vehicleId],
    references: [vehicleSpecificationsTable.vehicleId],
  }),
  location: one(locationsTable, {
    fields: [bookingsTable.locationId],
    references: [locationsTable.locationId],
  }),
  payments: many(paymentsTable),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  booking: one(bookingsTable, {
    fields: [paymentsTable.bookingId],
    references: [bookingsTable.bookingId],
  }),
}));

export const authenticationRelations = relations(authenticationTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [authenticationTable.userId],
    references: [usersTable.userId],
  }),
}));

export const customerSupportTicketsRelations = relations(customerSupportTicketsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [customerSupportTicketsTable.userId],
    references: [usersTable.userId],
  }),
}));

export const locationsRelations = relations(locationsTable, ({ many }) => ({
  bookings: many(bookingsTable),
}));

export const fleetManagementRelations = relations(fleetManagementTable, ({ one }) => ({
  vehicle: one(vehicleSpecificationsTable, {
    fields: [fleetManagementTable.vehicleId],
    references: [vehicleSpecificationsTable.vehicleId],
  }),
}));




export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;
export type VehicleSpecificationInsert = typeof vehicleSpecificationsTable.$inferInsert;
export type VehicleSpecificationSelect = typeof vehicleSpecificationsTable.$inferSelect;
export type VehicleInsert = typeof VehiclesTable.$inferInsert;
export type VehicleSelect = typeof VehiclesTable.$inferSelect;
export type BookingInsert = typeof bookingsTable.$inferInsert;
export type BookingSelect = typeof bookingsTable.$inferSelect;
export type PaymentInsert = typeof paymentsTable.$inferInsert;
export type PaymentSelect = typeof paymentsTable.$inferSelect;
export type AuthenticationInsert = typeof authenticationTable.$inferInsert;
export type AuthenticationSelect = typeof authenticationTable.$inferSelect;
export type CustomerSupportTicketInsert = typeof customerSupportTicketsTable.$inferInsert;
export type CustomerSupportTicketSelect = typeof customerSupportTicketsTable.$inferSelect;
export type LocationInsert = typeof locationsTable.$inferInsert;
export type LocationSelect = typeof locationsTable.$inferSelect;
export type FleetManagementInsert = typeof fleetManagementTable.$inferInsert;
export type FleetManagementSelect = typeof fleetManagementTable.$inferSelect;

