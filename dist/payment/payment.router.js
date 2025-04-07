"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const hono_1 = require("hono");
const payment_controller_1 = require("./payment.controller");
//  import { userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';
exports.paymentRouter = new hono_1.Hono();
exports.paymentRouter
    .get("payments", 
// bothRoleAuth,
payment_controller_1.getAllPaymentsController)
    .get("payments/:id", 
// bothRoleAuth, 
payment_controller_1.getPaymentByIdController)
    .post("payments", 
// userRoleAuth,
payment_controller_1.createPaymentController)
    .put("payments/:id"
// ,bothRoleAuth
, payment_controller_1.updatePaymentController)
    .delete("payments/:id", 
// bothRoleAuth, 
payment_controller_1.deletePaymentController);
exports.default = exports.paymentRouter;
