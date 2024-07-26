import { Hono } from 'hono';
import { getAllPaymentsController, getPaymentByIdController, createPaymentController, updatePaymentController, deletePaymentController } from './payment.controller';
 import { userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';

export const paymentRouter = new Hono();

paymentRouter
    .get("payments",bothRoleAuth, getAllPaymentsController)
    .get("payments/:id",bothRoleAuth, getPaymentByIdController)
    .post("payments", userRoleAuth,createPaymentController)
    .put("payments/:id",bothRoleAuth,  updatePaymentController)
    .delete("payments/:id",bothRoleAuth, deletePaymentController);

export default paymentRouter;
