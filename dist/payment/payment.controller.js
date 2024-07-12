"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentController = exports.updatePaymentController = exports.createPaymentController = exports.getPaymentByIdController = exports.getAllPaymentsController = void 0;
const payment_service_1 = require("./payment.service");
// Get all payments
const getAllPaymentsController = async (c) => {
    try {
        const payments = await (0, payment_service_1.getAllPaymentsService)();
        if (!payments || payments.length === 0) {
            return c.text("No payments found", 404);
        }
        return c.json(payments, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAllPaymentsController = getAllPaymentsController;
// Get payment by ID
const getPaymentByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const payment = await (0, payment_service_1.getPaymentByIdService)(id);
        if (!payment) {
            return c.text("Payment not found", 404);
        }
        return c.json(payment, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getPaymentByIdController = getPaymentByIdController;
// Create payment
const createPaymentController = async (c) => {
    try {
        const payment = await c.req.json();
        const newPayment = await (0, payment_service_1.createPaymentService)(payment);
        if (!newPayment) {
            return c.text("Payment not created", 400);
        }
        return c.json({ message: "Payment created successfully" }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createPaymentController = createPaymentController;
// Update payment
const updatePaymentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const payment = await c.req.json();
        const updatedPayment = await (0, payment_service_1.updatePaymentService)(id, payment);
        if (!updatedPayment) {
            return c.text("Payment not updated", 400);
        }
        return c.json({ message: "Payment updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updatePaymentController = updatePaymentController;
// Delete payment
const deletePaymentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const deletedPayment = await (0, payment_service_1.deletePaymentService)(id);
        if (!deletedPayment) {
            return c.text("Payment not deleted", 400);
        }
        return c.json({ message: "Payment deleted successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deletePaymentController = deletePaymentController;
