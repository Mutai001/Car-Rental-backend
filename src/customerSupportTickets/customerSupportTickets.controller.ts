import { Context } from "hono";
import { 
    customerSupportTicketsService, 
    deleteCustomerSupportTicketService, 
    getCustomerSupportTicketByIdService, 
    insertCustomerSupportTicketService, 
    updateCustomerSupportTicketService 
} from "./customerSupportTickets.service";

// List all customer support tickets
export const listAllCustomerSupportTickets = async (c: Context) => {
    try {
        const tickets = await customerSupportTicketsService();
        if (tickets === null) return c.text("No customer support tickets found");
        return c.json(tickets, 200);
    } catch (error: any) {
        return c.text("Error while fetching customer support tickets", 400);
    }
}

// Get customer support ticket by ID
export const getCustomerSupportTicketById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const ticket = await getCustomerSupportTicketByIdService(id);
        if (ticket === undefined) return c.text("Customer support ticket not found 😒", 404);
        return c.json(ticket, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert customer support ticket
export const insertCustomerSupportTicket = async (c: Context) => {
    try {
        const ticket = await c.req.json();
        const createdTicket = await insertCustomerSupportTicketService(ticket);
        if (createdTicket === undefined) {
            return c.text("Error while inserting customer support ticket", 400);
        }
        return c.json(createdTicket, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update customer support ticket
export const updateCustomerSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const ticket = await c.req.json();
    try {
        const existingTicket = await getCustomerSupportTicketByIdService(id);
        if (existingTicket === undefined) return c.text("Customer support ticket not found", 404);
        const updatedTicket = await updateCustomerSupportTicketService(id, ticket);
        if (!updatedTicket) return c.text("Error while updating customer support ticket", 400);
        return c.json({ msg: updatedTicket }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete customer support ticket
export const deleteCustomerSupportTicket = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingTicket = await getCustomerSupportTicketByIdService(id);
        if (existingTicket === undefined) return c.text("Customer support ticket not found", 404);
        const deletedTicket = await deleteCustomerSupportTicketService(id);
        return c.json({ msg: deletedTicket }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
