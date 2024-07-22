"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSecretKey = void 0;
// src/stripe.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.stripeSecretKey = process.env.STRIPE_SECRET_KEY || "STRIPE_SECRET_KEY";
console.log('Stripe Secret Key:', exports.stripeSecretKey); // Debugging: Ensure the key is loaded
