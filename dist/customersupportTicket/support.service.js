"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicketService = exports.updateCustomerSupportTicketService = exports.createCustomerSupportTicketService = exports.getCustomerSupportTicketByIdService = exports.getAllCustomerSupportTicketsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all customer support tickets
const getAllCustomerSupportTicketsService = async () => {
    const tickets = await db_1.db.query.CustomerSupportTicketsTable.findMany();
    return tickets;
};
exports.getAllCustomerSupportTicketsService = getAllCustomerSupportTicketsService;
// Get customer support ticket by ID
const getCustomerSupportTicketByIdService = async (ticket_id) => {
    const ticket = await db_1.db.query.CustomerSupportTicketsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticket_id, ticket_id),
    });
    return ticket;
};
exports.getCustomerSupportTicketByIdService = getCustomerSupportTicketByIdService;
// Create customer support ticket
const createCustomerSupportTicketService = async (ticket) => {
    await db_1.db.insert(schema_1.CustomerSupportTicketsTable).values(ticket);
    return "Customer support ticket created successfully";
};
exports.createCustomerSupportTicketService = createCustomerSupportTicketService;
// Update customer support ticket
const updateCustomerSupportTicketService = async (ticket_id, ticket) => {
    await db_1.db.update(schema_1.CustomerSupportTicketsTable).set(ticket).where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticket_id, ticket_id));
    return "Customer support ticket updated successfully";
};
exports.updateCustomerSupportTicketService = updateCustomerSupportTicketService;
// Delete customer support ticket
const deleteCustomerSupportTicketService = async (ticket_id) => {
    await db_1.db.delete(schema_1.CustomerSupportTicketsTable).where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticket_id, ticket_id));
    return "Customer support ticket deleted successfully";
};
exports.deleteCustomerSupportTicketService = deleteCustomerSupportTicketService;
