import { z } from 'zod';

// Define the schema for fleet management
export const createFleetManagementValidator = z.object({
    vehicleId: z.number().int().positive("Vehicle ID must be a positive integer"),
    acquisitionDate: z.string().min(1, "Acquisition date is required"),
    depreciationRate: z.number().nonnegative("Depreciation rate must be non-negative"),
    currentValue: z.number().nonnegative("Current value must be non-negative"),
    maintenanceCost: z.number().nonnegative("Maintenance cost must be non-negative"),
    status: z.string().min(1, "Status is required"),
});

// Define the schema for updating fleet management
export const updateFleetManagementValidator = z.object({
    vehicleId: z.number().int().positive("Vehicle ID must be a positive integer").optional(),
    acquisitionDate: z.string().min(1, "Acquisition date is required").optional(),
    depreciationRate: z.number().nonnegative("Depreciation rate must be non-negative").optional(),
    currentValue: z.number().nonnegative("Current value must be non-negative").optional(),
    maintenanceCost: z.number().nonnegative("Maintenance cost must be non-negative").optional(),
    status: z.string().min(1, "Status is required").optional(),
});
