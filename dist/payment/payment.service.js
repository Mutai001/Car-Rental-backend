"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.getPaymentByIdService = exports.getAllPaymentsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all payments
const getAllPaymentsService = async () => {
    const payments = await db_1.db.query.PaymentsTable.findMany();
    return payments;
};
exports.getAllPaymentsService = getAllPaymentsService;
// Get payment by ID
const getPaymentByIdService = async (payment_id) => {
    const payment = await db_1.db.query.PaymentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.PaymentsTable.payment_id, payment_id),
    });
    return payment;
};
exports.getPaymentByIdService = getPaymentByIdService;
// Create payment
const createPaymentService = async (payment) => {
    await db_1.db.insert(schema_1.PaymentsTable).values(payment);
    return "Payment created successfully";
};
exports.createPaymentService = createPaymentService;
// Update payment
const updatePaymentService = async (payment_id, payment) => {
    await db_1.db.update(schema_1.PaymentsTable).set(payment).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.payment_id, payment_id));
    return "Payment updated successfully";
};
exports.updatePaymentService = updatePaymentService;
// Delete payment
const deletePaymentService = async (payment_id) => {
    await db_1.db.delete(schema_1.PaymentsTable).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.payment_id, payment_id));
    return "Payment deleted successfully";
};
exports.deletePaymentService = deletePaymentService;
