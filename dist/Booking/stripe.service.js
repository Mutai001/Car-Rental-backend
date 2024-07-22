"use strict";
// import Stripe from 'stripe';
// import { stripeSecretKey } from '../stripeConfig'; // Import your Stripe secret key from the config file
// const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' });
// // Handle Stripe payment
// export const stripePaymentHandler = async (paymentDetails: { amount: number; currency: string; source: string }) => {
//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: paymentDetails.amount,
//             currency: paymentDetails.currency,
//             payment_method: paymentDetails.source,
//             confirm: true,
//         });
//         return { success: true, message: 'Payment successful', paymentIntent };
//     } catch (error: any) {
//         return { success: false, message: error.message };
//     }
// };
// export default stripe;
