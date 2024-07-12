"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.insertPaymentService = exports.getPaymentByIdService = exports.paymentsService = exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("../config/stripe"));
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
// Create a payment intent with Stripe
const createPaymentIntent = async (amount, currency = 'usd') => {
    const paymentIntent = await stripe_1.default.paymentIntents.create({
        amount,
        currency,
    });
    return paymentIntent;
};
exports.createPaymentIntent = createPaymentIntent;
// List all payments
const paymentsService = async () => {
    return await db_1.default.query.paymentsTable.findMany();
};
exports.paymentsService = paymentsService;
// Get payment by ID
const getPaymentByIdService = async (id) => {
    return await db_1.default.query.paymentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.paymentsTable.paymentId, id)
    });
};
exports.getPaymentByIdService = getPaymentByIdService;
// Insert payment
const insertPaymentService = async (payment) => {
    const result = await db_1.default.insert(schema_1.paymentsTable).values(payment)
        .returning({ payment_id: schema_1.paymentsTable.paymentId, booking_id: schema_1.paymentsTable.bookingId, amount: schema_1.paymentsTable.amount, payment_status: schema_1.paymentsTable.paymentStatus })
        .execute();
    if (result) {
        const createdPayment = result[0];
        return createdPayment;
    }
    else {
        throw new Error("Failed to insert payment");
    }
};
exports.insertPaymentService = insertPaymentService;
// Update payment
const updatePaymentService = async (id, payment) => {
    await db_1.default.update(schema_1.paymentsTable).set(payment).where((0, drizzle_orm_1.eq)(schema_1.paymentsTable.paymentId, id));
    return "Payment updated successfully 🎉";
};
exports.updatePaymentService = updatePaymentService;
// Delete payment
const deletePaymentService = async (id) => {
    await db_1.default.delete(schema_1.paymentsTable).where((0, drizzle_orm_1.eq)(schema_1.paymentsTable.paymentId, id));
    return "Payment deleted successfully 🎉";
};
exports.deletePaymentService = deletePaymentService;
