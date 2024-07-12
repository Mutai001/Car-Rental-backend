"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const hono_1 = require("hono");
const payment_controller_1 = require("./payment.controller");
exports.paymentRouter = new hono_1.Hono();
exports.paymentRouter
    .get("payments", payment_controller_1.getAllPaymentsController)
    .get("payments/:id", payment_controller_1.getPaymentByIdController)
    .post("payments", payment_controller_1.createPaymentController)
    .put("payments/:id", payment_controller_1.updatePaymentController)
    .delete("payments/:id", payment_controller_1.deletePaymentController);
exports.default = exports.paymentRouter;
