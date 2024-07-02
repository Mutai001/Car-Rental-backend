import { z } from 'zod';

// Define the schema for payment
export const createPaymentValidator = z.object({
    bookingId: z.number().min(1, "Booking ID is required"),
    amount: z.number().min(0, "Amount must be positive"),
    paymentStatus: z.string().min(1, "Payment status is required"),
    paymentDate: z.string().min(1, "Payment date is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    transactionId: z.string().min(1, "Transaction ID is required"),
});

// Define the schema for updating payment
export const updatePaymentValidator = z.object({
    bookingId: z.number().min(1, "Booking ID is required").optional(),
    amount: z.number().min(0, "Amount must be positive").optional(),
    paymentStatus: z.string().min(1, "Payment status is required").optional(),
    paymentDate: z.string().min(1, "Payment date is required").optional(),
    paymentMethod: z.string().min(1, "Payment method is required").optional(),
    transactionId: z.string().min(1, "Transaction ID is required").optional(),
});
