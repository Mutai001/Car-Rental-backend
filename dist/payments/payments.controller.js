"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.insertPayment = exports.getPaymentById = exports.listAllPayments = exports.createPayment = void 0;
const payments_service_1 = require("./payments.service");
// Create a payment intent and return the client secret
const createPayment = async (c) => {
    try {
        const { amount } = await c.req.json();
        const paymentIntent = await (0, payments_service_1.createPaymentIntent)(amount);
        return c.json({ clientSecret: paymentIntent.client_secret }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createPayment = createPayment;
// List all payments
const listAllPayments = async (c) => {
    try {
        const payments = await (0, payments_service_1.paymentsService)();
        if (payments === null)
            return c.text("No payments found");
        return c.json(payments, 200);
    }
    catch (error) {
        return c.text("Error while fetching payments", 400);
    }
};
exports.listAllPayments = listAllPayments;
// Get payment by ID
const getPaymentById = async (c) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const payment = await (0, payments_service_1.getPaymentByIdService)(id);
        if (payment === undefined)
            return c.text("Payment not found 😒", 404);
        return c.json(payment, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getPaymentById = getPaymentById;
// Insert payment
const insertPayment = async (c) => {
    try {
        const payment = await c.req.json();
        const createdPayment = await (0, payments_service_1.insertPaymentService)(payment);
        if (createdPayment === undefined) {
            return c.text("Error while inserting payment", 400);
        }
        return c.json(createdPayment, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertPayment = insertPayment;
// Update payment
const updatePayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const payment = await c.req.json();
    try {
        const existingPayment = await (0, payments_service_1.getPaymentByIdService)(id);
        if (existingPayment === undefined)
            return c.text("Payment not found", 404);
        const updatedPayment = await (0, payments_service_1.updatePaymentService)(id, payment);
        if (!updatedPayment)
            return c.text("Error while updating payment", 400);
        return c.json({ msg: updatedPayment }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updatePayment = updatePayment;
// Delete payment
const deletePayment = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const existingPayment = await (0, payments_service_1.getPaymentByIdService)(id);
        if (existingPayment === undefined)
            return c.text("Payment not found", 404);
        const deletedPayment = await (0, payments_service_1.deletePaymentService)(id);
        return c.json({ msg: deletedPayment }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deletePayment = deletePayment;
