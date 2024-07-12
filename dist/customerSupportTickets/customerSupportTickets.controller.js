"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicket = exports.updateCustomerSupportTicket = exports.insertCustomerSupportTicket = exports.getCustomerSupportTicketById = exports.listAllCustomerSupportTickets = void 0;
const customerSupportTickets_service_1 = require("./customerSupportTickets.service");
// List all customer support tickets
const listAllCustomerSupportTickets = async (c) => {
    try {
        const tickets = await (0, customerSupportTickets_service_1.customerSupportTicketsService)();
        if (tickets === null)
            return c.text("No customer support tickets found");
        return c.json(tickets, 200);
    }
    catch (error) {
        return c.text("Error while fetching customer support tickets", 400);
    }
};
exports.listAllCustomerSupportTickets = listAllCustomerSupportTickets;
// Get customer support ticket by ID
const getCustomerSupportTicketById = async (c) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const ticket = await (0, customerSupportTickets_service_1.getCustomerSupportTicketByIdService)(id);
        if (ticket === undefined)
            return c.text("Customer support ticket not found 😒", 404);
        return c.json(ticket, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getCustomerSupportTicketById = getCustomerSupportTicketById;
// Insert customer support ticket
const insertCustomerSupportTicket = async (c) => {
    try {
        const ticket = await c.req.json();
        const createdTicket = await (0, customerSupportTickets_service_1.insertCustomerSupportTicketService)(ticket);
        if (createdTicket === undefined) {
            return c.text("Error while inserting customer support ticket", 400);
        }
        return c.json(createdTicket, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertCustomerSupportTicket = insertCustomerSupportTicket;
// Update customer support ticket
const updateCustomerSupportTicket = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const ticket = await c.req.json();
    try {
        const existingTicket = await (0, customerSupportTickets_service_1.getCustomerSupportTicketByIdService)(id);
        if (existingTicket === undefined)
            return c.text("Customer support ticket not found", 404);
        const updatedTicket = await (0, customerSupportTickets_service_1.updateCustomerSupportTicketService)(id, ticket);
        if (!updatedTicket)
            return c.text("Error while updating customer support ticket", 400);
        return c.json({ msg: updatedTicket }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateCustomerSupportTicket = updateCustomerSupportTicket;
// Delete customer support ticket
const deleteCustomerSupportTicket = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const existingTicket = await (0, customerSupportTickets_service_1.getCustomerSupportTicketByIdService)(id);
        if (existingTicket === undefined)
            return c.text("Customer support ticket not found", 404);
        const deletedTicket = await (0, customerSupportTickets_service_1.deleteCustomerSupportTicketService)(id);
        return c.json({ msg: deletedTicket }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteCustomerSupportTicket = deleteCustomerSupportTicket;
