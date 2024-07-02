import { z } from 'zod';

// Define the schema for vehicle specification
export const createVehicleSpecificationValidator = z.object({
    manufacturer: z.string().min(1, "Manufacturer is required"),
    model: z.string().min(1, "Model is required"),
    year: z.number().int().positive("Year must be a positive integer"),
    fuelType: z.string().min(1, "Fuel type is required"),
    engineCapacity: z.number().positive("Engine capacity must be a positive number"),
    transmission: z.string().min(1, "Transmission is required"),
    seatingCapacity: z.number().int().positive("Seating capacity must be a positive integer"),
    color: z.string().min(1, "Color is required"),
    features: z.string().optional(),
});

// Define the schema for updating vehicle specification
export const updateVehicleSpecificationValidator = z.object({
    manufacturer: z.string().min(1, "Manufacturer is required").optional(),
    model: z.string().min(1, "Model is required").optional(),
    year: z.number().int().positive("Year must be a positive integer").optional(),
    fuelType: z.string().min(1, "Fuel type is required").optional(),
    engineCapacity: z.number().positive("Engine capacity must be a positive number").optional(),
    transmission: z.string().min(1, "Transmission is required").optional(),
    seatingCapacity: z.number().int().positive("Seating capacity must be a positive integer").optional(),
    color: z.string().min(1, "Color is required").optional(),
    features: z.string().optional(),
});
