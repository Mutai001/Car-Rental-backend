import { z } from 'zod';

// Define the schema for vehicle
export const createVehicleValidator = z.object({
    vehicleId: z.number().int().positive("Vehicle ID must be a positive integer"),
    rentalRate: z.number().positive("Rental rate must be a positive number"),
    availability: z.boolean().default(true),
});

// Define the schema for updating vehicle
export const updateVehicleValidator = z.object({
    vehicleId: z.number().int().positive("Vehicle ID must be a positive integer").optional(),
    rentalRate: z.number().positive("Rental rate must be a positive number").optional(),
    availability: z.boolean().optional(),
});
