"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageBookingTransaction = void 0;
const db_1 = require("../drizzle/db");
const paystack_api_1 = __importDefault(require("paystack-api"));
const Booking_Service_1 = require("./Booking.Service");
const schema_1 = require("../drizzle/schema"); // Ensure this import is correct
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
const paystack = (0, paystack_api_1.default)(paystackSecretKey);
const manageBookingTransaction = async (booking) => {
    console.log("Proceeding to process payment...");
    try {
        // Start a transaction
        await db_1.db.transaction(async (trx) => {
            // Calculate amount in kobo (100 kobo = 1 Naira in Paystack)
            const amountInKobo = Math.round(parseFloat(booking.total_amount) * 100);
            // Generate a unique transaction reference
            const transactionReference = `booking_${booking.booking_id}_${Date.now()}`;
            // Paystack Payment Processing
            const payment = await paystack.transaction.initialize({
                amount: amountInKobo, // Amount in kobo (integer)
                email: "example@example.com", // Replace with user's email from booking
                reference: transactionReference, // Use generated transaction reference
            });
            // If payment fails, it will throw an error and the transaction will be rolled back
            console.log("Payment processing successful. Transaction Reference:", payment.data.reference);
            // Proceed to create booking only if payment is successful
            await (0, Booking_Service_1.createBookingServiceWithTransaction)(booking, trx);
            // Record the payment details in the PaymentsTable
            await trx.insert(schema_1.PaymentsTable).values({
                booking_id: booking.booking_id,
                amount: booking.total_amount,
                payment_status: "Pending", // Assuming payment was successful
                payment_date: new Date(),
                payment_method: "Paystack",
                transaction_id: payment.data.reference, // Unique transaction ID from Paystack
            });
            console.log("Booking and payment details recorded in the database.");
        });
        console.log("Booking and payment processed successfully.");
        return { success: true, message: "Booking and payment processed successfully" };
    }
    catch (error) {
        console.error("Booking and payment processing failed:", error.message || error);
        return { success: false, message: "Booking and payment processing failed: " + (error.message || error) };
    }
};
exports.manageBookingTransaction = manageBookingTransaction;
