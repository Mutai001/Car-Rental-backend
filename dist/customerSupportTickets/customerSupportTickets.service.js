"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicketService = exports.updateCustomerSupportTicketService = exports.insertCustomerSupportTicketService = exports.getCustomerSupportTicketByIdService = exports.customerSupportTicketsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const customerSupportTicketsService = async () => {
    return await db_1.default.query.customerSupportTicketsTable.findMany();
};
exports.customerSupportTicketsService = customerSupportTicketsService;
const getCustomerSupportTicketByIdService = async (id) => {
    return await db_1.default.query.customerSupportTicketsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.customerSupportTicketsTable.ticketId, id)
    });
};
exports.getCustomerSupportTicketByIdService = getCustomerSupportTicketByIdService;
// insertCustomerSupportTicketService function adjusted to return the created customer support ticket
const insertCustomerSupportTicketService = async (ticket) => {
    const result = await db_1.default.insert(schema_1.customerSupportTicketsTable).values(ticket)
        .returning({ ticket_id: schema_1.customerSupportTicketsTable.ticketId, user_id: schema_1.customerSupportTicketsTable.userId, subject: schema_1.customerSupportTicketsTable.subject, description: schema_1.customerSupportTicketsTable.description, status: schema_1.customerSupportTicketsTable.status })
        .execute();
    if (result) {
        const createdTicket = result[0];
        return createdTicket;
    }
    else {
        throw new Error("Failed to insert customer support ticket");
    }
};
exports.insertCustomerSupportTicketService = insertCustomerSupportTicketService;
const updateCustomerSupportTicketService = async (id, ticket) => {
    await db_1.default.update(schema_1.customerSupportTicketsTable).set(ticket).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicketsTable.ticketId, id));
    return "Customer support ticket updated successfully 🎉";
};
exports.updateCustomerSupportTicketService = updateCustomerSupportTicketService;
const deleteCustomerSupportTicketService = async (id) => {
    await db_1.default.delete(schema_1.customerSupportTicketsTable).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicketsTable.ticketId, id));
    return "Customer support ticket deleted successfully 🎉";
};
exports.deleteCustomerSupportTicketService = deleteCustomerSupportTicketService;
