import { Hono } from 'hono';
import {
  getAllCustomerSupportTicketsController,
  getCustomerSupportTicketByIdController,
  createCustomerSupportTicketController,
  updateCustomerSupportTicketController,
  deleteCustomerSupportTicketController,
} from './support.controller';
import { adminRoleAuth, bothRoleAuth } from '../middlewares/auth.middlewares';


export const customerSupportTicketsRouter = new Hono();

customerSupportTicketsRouter
  .get("customer-support-tickets", adminRoleAuth, getAllCustomerSupportTicketsController)
  .get("customer-support-tickets/:id", bothRoleAuth, getCustomerSupportTicketByIdController)
  .post("customer-support-tickets", adminRoleAuth, createCustomerSupportTicketController)
  .put("customer-support-tickets/:id",bothRoleAuth, updateCustomerSupportTicketController)
  .delete("customer-support-tickets/:id", bothRoleAuth, deleteCustomerSupportTicketController);

export default customerSupportTicketsRouter;
