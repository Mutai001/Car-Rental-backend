import { z } from 'zod';

// Enums
const userRoleEnum = z.enum(['user', 'admin']);

// 1. Users Schema
export const userSchema = z.object({
  userId: z.number().optional(),
  fullName: z.string(),
  email: z.string().email(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  role: userRoleEnum.default('user'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 2. Vehicle Specifications Schema
export const vehicleSpecificationSchema = z.object({
  vehicleId: z.number().optional(),
  manufacturer: z.string(),
  model: z.string(),
  year: z.number(),
  fuelType: z.string(),
  engineCapacity: z.number(),
  transmission: z.string(),
  seatingCapacity: z.number(),
  color: z.string(),
  features: z.string().optional(),
});

// 3. Vehicles Schema
export const vehicleSchema = z.object({
  vehicleSpecId: z.number().optional(),
  vehicleId: z.number(),
  rentalRate: z.number(),
  availability: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 4. Bookings Schema
export const bookingSchema = z.object({
  bookingId: z.number().optional(),
  userId: z.number(),
  vehicleId: z.number(),
  locationId: z.number(),
  bookingDate: z.date(),
  returnDate: z.date(),
  totalAmount: z.number(),
  bookingStatus: z.string().default('Pending'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 5. Payments Schema
export const paymentSchema = z.object({
  paymentId: z.number().optional(),
  bookingId: z.number(),
  amount: z.number(),
  paymentStatus: z.string().default('Pending'),
  paymentDate: z.date(),
  paymentMethod: z.string(),
  transactionId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 6. Authentication Schema
export const authenticationSchema = z.object({
  authId: z.number().optional(),
  userId: z.number(),
  password: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 7. Customer Support Tickets Schema
export const customerSupportTicketSchema = z.object({
  ticketId: z.number().optional(),
  userId: z.number(),
  subject: z.string(),
  description: z.string(),
  status: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 8. Locations Schema
export const locationSchema = z.object({
  locationId: z.number().optional(),
  name: z.string(),
  address: z.string(),
  contactPhone: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// 9. Fleet Management Schema
export const fleetManagementSchema = z.object({
  fleetId: z.number().optional(),
  vehicleId: z.number(),
  acquisitionDate: z.date(),
  depreciationRate: z.number(),
  currentValue: z.number(),
  maintenanceCost: z.number(),
  status: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
