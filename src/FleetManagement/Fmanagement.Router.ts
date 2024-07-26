import { Hono } from 'hono';
import { getAllFleetManagementController, getFleetManagementByIdController, createFleetManagementController, updateFleetManagementController, deleteFleetManagementController } from './Fmanagement.controller';
import { adminRoleAuth } from '../middlewares/auth.middlewares';

export const fleetManagementRouter = new Hono();

fleetManagementRouter
    .get("fleet-management", adminRoleAuth, getAllFleetManagementController)
    .get("fleet-management/:id", adminRoleAuth, getFleetManagementByIdController)
    .post("fleet-management", adminRoleAuth, createFleetManagementController)
    .put("fleet-management/:id", adminRoleAuth, updateFleetManagementController)
    .delete("fleet-management/:id", adminRoleAuth,deleteFleetManagementController);

export default fleetManagementRouter;
