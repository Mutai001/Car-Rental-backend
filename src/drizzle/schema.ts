import { pgTable, serial, text, varchar, timestamp, pgEnum, boolean, integer, numeric, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

// 1. Users Table
export const users = pgTable('users', {
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
export const vehicleSpecifications = pgTable('vehicle_specifications', {
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

// 3. Vehicles Table
export const vehicles = pgTable('vehicles', {
  vehicleSpecId: serial('vehicle_spec_id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => vehicleSpecifications.vehicleId),
  rentalRate: numeric('rental_rate'),
  availability: boolean('availability'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. Bookings Table
export const bookings = pgTable('bookings', {
  bookingId: serial('booking_id').primaryKey(),
  userId: integer('user_id').references(() => users.userId),
  vehicleId: integer('vehicle_id').references(() => vehicleSpecifications.vehicleId),
  locationId: integer('location_id').references(() => locations.locationId),
  bookingDate: date('booking_date'),
  returnDate: date('return_date'),
  totalAmount: numeric('total_amount'),
  bookingStatus: varchar('booking_status', { length: 20 }).default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 5. Payments Table
export const payments = pgTable('payments', {
  paymentId: serial('payment_id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.bookingId),
  amount: numeric('amount'),
  paymentStatus: varchar('payment_status', { length: 20 }).default('Pending'),
  paymentDate: timestamp('payment_date'),
  paymentMethod: varchar('payment_method', { length: 50 }),
  transactionId: varchar('transaction_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 6. Authentication Table
export const authentication = pgTable('authentication', {
  authId: serial('auth_id').primaryKey(),
  userId: integer('user_id').references(() => users.userId),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 7. Customer Support Tickets Table
export const customerSupportTickets = pgTable('customer_support_tickets', {
  ticketId: serial('ticket_id').primaryKey(),
  userId: integer('user_id').references(() => users.userId),
  subject: varchar('subject', { length: 255 }),
  description: text('description'),
  status: varchar('status', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 8. Locations Table
export const locations = pgTable('locations', {
  locationId: serial('location_id').primaryKey(),
  name: varchar('name', { length: 100 }),
  address: text('address'),
  contactPhone: varchar('contact_phone', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 9. Fleet Management Table
export const fleetManagement = pgTable('fleet_management', {
  fleetId: serial('fleet_id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => vehicleSpecifications.vehicleId),
  acquisitionDate: date('acquisition_date'),
  depreciationRate: numeric('depreciation_rate'),
  currentValue: numeric('current_value'),
  maintenanceCost: numeric('maintenance_cost'),
  status: varchar('status', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  bookings: many(bookings),
  authentication: one(authentication),
  supportTickets: many(customerSupportTickets),
}));

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  specification: one(vehicleSpecifications, {
    fields: [vehicles.vehicleId],
    references: [vehicleSpecifications.vehicleId],
  }),
}));

export const vehicleSpecificationsRelations = relations(vehicleSpecifications, ({ many }) => ({
  bookings: many(bookings),
  fleetManagement: many(fleetManagement),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.userId],
  }),
  vehicle: one(vehicleSpecifications, {
    fields: [bookings.vehicleId],
    references: [vehicleSpecifications.vehicleId],
  }),
  location: one(locations, {
    fields: [bookings.locationId],
    references: [locations.locationId],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.bookingId],
  }),
}));

export const authenticationRelations = relations(authentication, ({ one }) => ({
  user: one(users, {
    fields: [authentication.userId],
    references: [users.userId],
  }),
}));

export const customerSupportTicketsRelations = relations(customerSupportTickets, ({ one }) => ({
  user: one(users, {
    fields: [customerSupportTickets.userId],
    references: [users.userId],
  }),
}));

export const locationsRelations = relations(locations, ({ many }) => ({
  bookings: many(bookings),
}));

export const fleetManagementRelations = relations(fleetManagement, ({ one }) => ({
  vehicle: one(vehicleSpecifications, {
    fields: [fleetManagement.vehicleId],
    references: [vehicleSpecifications.vehicleId],
  }),
}));
