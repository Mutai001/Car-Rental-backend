import { Hono } from "hono";
import { 
    deleteCustomerSupportTicket, 
    getCustomerSupportTicketById, 
    insertCustomerSupportTicket, 
    listAllCustomerSupportTickets, 
    updateCustomerSupportTicket 
} from "./customerSupportTickets.controller";
import { createCustomerSupportTicketValidator, updateCustomerSupportTicketValidator } from '../validators/CustomerSupportValidators';
import { zValidator } from "@hono/zod-validator";

export const customerSupportTicketsRouter = new Hono();

// Get all customer support tickets
customerSupportTicketsRouter.get('/customer-support-tickets', listAllCustomerSupportTickets);

// Get customer support ticket by ID
customerSupportTicketsRouter.get('/customer-support-ticket/:id', getCustomerSupportTicketById);

// Insert customer support ticket
customerSupportTicketsRouter.post('/customer-support-tickets', zValidator('json', createCustomerSupportTicketValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertCustomerSupportTicket);

// Update customer support ticket
customerSupportTicketsRouter.put('/customer-support-tickets/:id', zValidator('json', updateCustomerSupportTicketValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), updateCustomerSupportTicket);

// Delete customer support ticket
customerSupportTicketsRouter.delete('/customer-support-tickets/:id', deleteCustomerSupportTicket);
