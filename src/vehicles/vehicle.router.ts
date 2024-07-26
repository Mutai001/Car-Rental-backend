import { Hono } from 'hono';
import { getAllVehiclesController, getVehicleByIdController, createVehicleController, updateVehicleController, deleteVehicleController } from './vehicles.controller';
 import { adminRoleAuth, bothRoleAuth } from '../middlewares/auth.middlewares';

export const vehicleRouter = new Hono();

vehicleRouter
    .get("vehicles", bothRoleAuth,getAllVehiclesController)
    .get("vehicles/:id", bothRoleAuth,getVehicleByIdController)
    .post("vehicles", adminRoleAuth, createVehicleController)
    .put("vehicles/:id",adminRoleAuth, updateVehicleController)
    .delete("vehicles/:id",  adminRoleAuth, deleteVehicleController);

export default vehicleRouter;
