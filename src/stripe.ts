// src/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe('pk_test_51PbJox2KMNFPNnEGF0rcBxjD8rRZCyPhy7tOlnDDQUerAnMSstet7bBcg0mgZrXrUhprYbDSbA4Bnm37F1fIsuJn00NUmJnlOy', {
    apiVersion: '2024-06-20',
});

export default stripe;
