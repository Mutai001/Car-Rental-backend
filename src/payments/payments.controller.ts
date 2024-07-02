import { Context } from "hono";
import { 
    paymentsService, 
    deletePaymentService, 
    getPaymentByIdService, 
    insertPaymentService, 
    updatePaymentService 
} from "./payments.service";

// List all payments
export const listAllPayments = async (c: Context) => {
    try {
        const payments = await paymentsService();
        if (payments === null) return c.text("No payments found");
        return c.json(payments, 200);
    } catch (error: any) {
        return c.text("Error while fetching payments", 400);
    }
}

// Get payment by ID
export const getPaymentById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const payment = await getPaymentByIdService(id);
        if (payment === undefined) return c.text("Payment not found 😒", 404);
        return c.json(payment, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert payment
export const insertPayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const createdPayment = await insertPaymentService(payment);
        if (createdPayment === undefined) {
            return c.text("Error while inserting payment", 400);
        }
        return c.json(createdPayment, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update payment
export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const payment = await c.req.json();
    try {
        const existingPayment = await getPaymentByIdService(id);
        if (existingPayment === undefined) return c.text("Payment not found", 404);
        const updatedPayment = await updatePaymentService(id, payment);
        if (!updatedPayment) return c.text("Error while updating payment", 400);
        return c.json({ msg: updatedPayment }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete payment
export const deletePayment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingPayment = await getPaymentByIdService(id);
        if (existingPayment === undefined) return c.text("Payment not found", 404);
        const deletedPayment = await deletePaymentService(id);
        return c.json({ msg: deletedPayment }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
