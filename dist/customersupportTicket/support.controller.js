"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicketController = exports.updateCustomerSupportTicketController = exports.createCustomerSupportTicketController = exports.getCustomerSupportTicketByIdController = exports.getAllCustomerSupportTicketsController = void 0;
const support_service_1 = require("./support.service");
// Get all customer support tickets
const getAllCustomerSupportTicketsController = async (c) => {
    try {
        const tickets = await (0, support_service_1.getAllCustomerSupportTicketsService)();
        if (!tickets || tickets.length === 0) {
            return c.text("No customer support tickets found", 404);
        }
        return c.json(tickets, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAllCustomerSupportTicketsController = getAllCustomerSupportTicketsController;
// Get customer support ticket by ID
const getCustomerSupportTicketByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const ticket = await (0, support_service_1.getCustomerSupportTicketByIdService)(id);
        if (!ticket) {
            return c.text("Customer support ticket not found", 404);
        }
        return c.json(ticket, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCustomerSupportTicketByIdController = getCustomerSupportTicketByIdController;
// Create customer support ticket
const createCustomerSupportTicketController = async (c) => {
    try {
        const ticket = await c.req.json();
        const newTicket = await (0, support_service_1.createCustomerSupportTicketService)(ticket);
        if (!newTicket) {
            return c.text("Customer support ticket not created", 400);
        }
        return c.json({ message: "Customer support ticket created successfully" }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCustomerSupportTicketController = createCustomerSupportTicketController;
// Update customer support ticket
const updateCustomerSupportTicketController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const ticket = await c.req.json();
        const updatedTicket = await (0, support_service_1.updateCustomerSupportTicketService)(id, ticket);
        if (!updatedTicket) {
            return c.text("Customer support ticket not updated", 400);
        }
        return c.json({ message: "Customer support ticket updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCustomerSupportTicketController = updateCustomerSupportTicketController;
// Delete customer support ticket
const deleteCustomerSupportTicketController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const deletedTicket = await (0, support_service_1.deleteCustomerSupportTicketService)(id);
        if (!deletedTicket) {
            return c.text("Customer support ticket not deleted", 400);
        }
        return c.json({ message: "Customer support ticket deleted successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCustomerSupportTicketController = deleteCustomerSupportTicketController;
