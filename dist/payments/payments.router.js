"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const hono_1 = require("hono");
const payments_controller_1 = require("./payments.controller");
const paymentsValidator_1 = require("../validators/paymentsValidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.paymentsRouter = new hono_1.Hono();
// Get all payments
exports.paymentsRouter.get('/payments', payments_controller_1.listAllPayments);
// Get payment by ID
exports.paymentsRouter.get('/payment/:id', payments_controller_1.getPaymentById);
// Create payment intent
exports.paymentsRouter.post('/payments/create-intent', payments_controller_1.createPayment);
// Insert payment
exports.paymentsRouter.post('/payments', (0, zod_validator_1.zValidator)('json', paymentsValidator_1.createPaymentValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), payments_controller_1.insertPayment);
// Update payment
exports.paymentsRouter.put('/payments/:id', (0, zod_validator_1.zValidator)('json', paymentsValidator_1.updatePaymentValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), payments_controller_1.updatePayment);
// Delete payment
exports.paymentsRouter.delete('/payments/:id', payments_controller_1.deletePayment);
