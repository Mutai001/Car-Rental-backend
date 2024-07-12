import { Hono } from 'hono';
import { getAllPaymentsController, getPaymentByIdController, createPaymentController, updatePaymentController, deletePaymentController } from './payment.controller';
import { adminRoleAuth, userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';

export const paymentRouter = new Hono();

paymentRouter
    .get("payments",adminRoleAuth, getAllPaymentsController)
    .get("payments/:id",userRoleAuth, getPaymentByIdController)
    .post("payments",bothRoleAuth, createPaymentController)
    .put("payments/:id", bothRoleAuth, updatePaymentController)
    .delete("payments/:id", deletePaymentController);

export default paymentRouter;
