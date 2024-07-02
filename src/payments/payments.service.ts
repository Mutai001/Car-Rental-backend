import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { PaymentSelect, PaymentInsert, paymentsTable } from "../drizzle/schema";

export const paymentsService = async (): Promise<PaymentSelect[] | null> => {
    return await db.query.paymentsTable.findMany();
}

export const getPaymentByIdService = async (id: number): Promise<PaymentSelect | undefined> => {
    return await db.query.paymentsTable.findFirst({
        where: eq(paymentsTable.paymentId, id)
    });
}

// insertPaymentService function adjusted to return the created payment
export const insertPaymentService = async (payment: PaymentInsert) => {
    const result = await db.insert(paymentsTable).values(payment)
        .returning({ payment_id: paymentsTable.paymentId, booking_id: paymentsTable.bookingId, amount: paymentsTable.amount, payment_status: paymentsTable.paymentStatus })
        .execute();

    if (result) {
        const createdPayment = result[0];
        return createdPayment;
    } else {
        throw new Error("Failed to insert payment");
    }
}

export const updatePaymentService = async (id: number, payment: PaymentInsert) => {
    await db.update(paymentsTable).set(payment).where(eq(paymentsTable.paymentId, id));
    return "Payment updated successfully 🎉";
}

export const deletePaymentService = async (id: number) => {
    await db.delete(paymentsTable).where(eq(paymentsTable.paymentId, id));
    return "Payment deleted successfully 🎉";
}
