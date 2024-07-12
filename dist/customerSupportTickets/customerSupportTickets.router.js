"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportTicketsRouter = void 0;
const hono_1 = require("hono");
const customerSupportTickets_controller_1 = require("./customerSupportTickets.controller");
const CustomerSupportValidators_1 = require("../validators/CustomerSupportValidators");
const zod_validator_1 = require("@hono/zod-validator");
exports.customerSupportTicketsRouter = new hono_1.Hono();
// Get all customer support tickets
exports.customerSupportTicketsRouter.get('/customer-support-tickets', customerSupportTickets_controller_1.listAllCustomerSupportTickets);
// Get customer support ticket by ID
exports.customerSupportTicketsRouter.get('/customer-support-ticket/:id', customerSupportTickets_controller_1.getCustomerSupportTicketById);
// Insert customer support ticket
exports.customerSupportTicketsRouter.post('/customer-support-tickets', (0, zod_validator_1.zValidator)('json', CustomerSupportValidators_1.createCustomerSupportTicketValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), customerSupportTickets_controller_1.insertCustomerSupportTicket);
// Update customer support ticket
exports.customerSupportTicketsRouter.put('/customer-support-tickets/:id', (0, zod_validator_1.zValidator)('json', CustomerSupportValidators_1.updateCustomerSupportTicketValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), customerSupportTickets_controller_1.updateCustomerSupportTicket);
// Delete customer support ticket
exports.customerSupportTicketsRouter.delete('/customer-support-tickets/:id', customerSupportTickets_controller_1.deleteCustomerSupportTicket);
