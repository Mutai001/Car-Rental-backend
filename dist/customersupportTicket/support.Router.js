"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportTicketsRouter = void 0;
const hono_1 = require("hono");
const support_controller_1 = require("./support.controller");
// import { userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';
exports.customerSupportTicketsRouter = new hono_1.Hono();
exports.customerSupportTicketsRouter
    .get("customer-support-tickets", 
//  bothRoleAuth,
support_controller_1.getAllCustomerSupportTicketsController)
    .get("customer-support-tickets/:id", 
// userRoleAuth,
support_controller_1.getCustomerSupportTicketByIdController)
    .post("customer-support-tickets"
// ,userRoleAuth, 
, support_controller_1.createCustomerSupportTicketController)
    .put("customer-support-tickets/:id", 
//  userRoleAuth,
support_controller_1.updateCustomerSupportTicketController)
    .delete("customer-support-tickets/:id", 
// bothRoleAuth,
support_controller_1.deleteCustomerSupportTicketController);
exports.default = exports.customerSupportTicketsRouter;
