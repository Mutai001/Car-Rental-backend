import { z } from 'zod';

// Define the schema for location
export const createLocationValidator = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    contactPhone: z.string().min(1, "Contact phone is required"),
});

// Define the schema for updating location
export const updateLocationValidator = z.object({
    name: z.string().min(1, "Name is required").optional(),
    address: z.string().min(1, "Address is required").optional(),
    contactPhone: z.string().min(1, "Contact phone is required").optional(),
});
