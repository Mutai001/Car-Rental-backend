import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { CustomerSupportTicketSelect, CustomerSupportTicketInsert, customerSupportTicketsTable } from "../drizzle/schema";

export const customerSupportTicketsService = async (): Promise<CustomerSupportTicketSelect[] | null> => {
    return await db.query.customerSupportTicketsTable.findMany();
}

export const getCustomerSupportTicketByIdService = async (id: number): Promise<CustomerSupportTicketSelect | undefined> => {
    return await db.query.customerSupportTicketsTable.findFirst({
        where: eq(customerSupportTicketsTable.ticketId, id)
    });
}

// insertCustomerSupportTicketService function adjusted to return the created customer support ticket
export const insertCustomerSupportTicketService = async (ticket: CustomerSupportTicketInsert) => {
    const result = await db.insert(customerSupportTicketsTable).values(ticket)
        .returning({ ticket_id: customerSupportTicketsTable.ticketId, user_id: customerSupportTicketsTable.userId, subject: customerSupportTicketsTable.subject, description: customerSupportTicketsTable.description, status: customerSupportTicketsTable.status })
        .execute();

    if (result) {
        const createdTicket = result[0];
        return createdTicket;
    } else {
        throw new Error("Failed to insert customer support ticket");
    }
}

export const updateCustomerSupportTicketService = async (id: number, ticket: CustomerSupportTicketInsert) => {
    await db.update(customerSupportTicketsTable).set(ticket).where(eq(customerSupportTicketsTable.ticketId, id));
    return "Customer support ticket updated successfully 🎉";
}

export const deleteCustomerSupportTicketService = async (id: number) => {
    await db.delete(customerSupportTicketsTable).where(eq(customerSupportTicketsTable.ticketId, id));
    return "Customer support ticket deleted successfully 🎉";
}
