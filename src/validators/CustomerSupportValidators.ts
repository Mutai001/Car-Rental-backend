import { z } from 'zod';

// Define the schema for customer support ticket
export const createCustomerSupportTicketValidator = z.object({
    userId: z.number().int().positive("User ID must be a positive integer"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().min(1, "Description is required"),
    status: z.string().min(1, "Status is required"),
});

// Define the schema for updating customer support ticket
export const updateCustomerSupportTicketValidator = z.object({
    userId: z.number().int().positive("User ID must be a positive integer").optional(),
    subject: z.string().min(1, "Subject is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    status: z.string().min(1, "Status is required").optional(),
});
