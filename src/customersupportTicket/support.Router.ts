import { Hono } from 'hono';
import {
  getAllCustomerSupportTicketsController,
  getCustomerSupportTicketByIdController,
  createCustomerSupportTicketController,
  updateCustomerSupportTicketController,
  deleteCustomerSupportTicketController,
} from './support.controller';
import { userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';


export const customerSupportTicketsRouter = new Hono();

customerSupportTicketsRouter
  .get("customer-support-tickets", bothRoleAuth, getAllCustomerSupportTicketsController)
  .get("customer-support-tickets/:id",userRoleAuth, getCustomerSupportTicketByIdController)
  .post("customer-support-tickets",userRoleAuth,  createCustomerSupportTicketController)
  .put("customer-support-tickets/:id", userRoleAuth, updateCustomerSupportTicketController)
  .delete("customer-support-tickets/:id",bothRoleAuth, deleteCustomerSupportTicketController);

export default customerSupportTicketsRouter;
