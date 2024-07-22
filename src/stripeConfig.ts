// src/stripe.ts
import dotenv from "dotenv";
dotenv.config();
export const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "STRIPE_SECRET_KEY";
console.log('Stripe Secret Key:', stripeSecretKey); // Debugging: Ensure the key is loaded

