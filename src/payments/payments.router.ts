import { Hono } from "hono";
import { 
    deletePayment, 
    getPaymentById, 
    insertPayment, 
    listAllPayments, 
    updatePayment 
} from "./payments.controller";
import { createPaymentValidator, updatePaymentValidator } from '../validators/paymentsValidator';
import { zValidator } from "@hono/zod-validator";

export const paymentsRouter = new Hono();

// Get all payments
paymentsRouter.get('/payments', listAllPayments);

// Get payment by ID
paymentsRouter.get('/payment/:id', getPaymentById);

// Insert payment
paymentsRouter.post('/payments', zValidator('json', createPaymentValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertPayment);

// Update payment
paymentsRouter.put('/payments/:id', zValidator('json', updatePaymentValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), updatePayment);

// Delete payment
paymentsRouter.delete('/payments/:id', deletePayment);
