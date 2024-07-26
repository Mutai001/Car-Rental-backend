import { Hono } from 'hono';
import { getVehicleSpecificationsController, getVehicleSpecificationByIdController, createVehicleSpecificationController, updateVehicleSpecificationController, deleteVehicleSpecificationController } from './Vehiclespecication.controller';
import { zValidator } from '@hono/zod-validator';
import { vehicleSpecificationSchema } from '../validator';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middlewares/auth.middlewares';

export const vehicleSpecificationRouter = new Hono();

// GET ALL VEHICLE SPECIFICATIONS - accessible by users and admins
vehicleSpecificationRouter
    .get("vehicle-specifications", bothRoleAuth, getVehicleSpecificationsController)
    .post("vehicle-specifications", zValidator('json', vehicleSpecificationSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),adminRoleAuth, createVehicleSpecificationController);

// GET VEHICLE SPECIFICATION BY ID - accessible by both users and admins
vehicleSpecificationRouter
    .get("vehicle-specifications/:id", bothRoleAuth,getVehicleSpecificationByIdController)
    .put("vehicle-specifications/:id", zValidator('json', vehicleSpecificationSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),adminRoleAuth, updateVehicleSpecificationController)
    // Restrict DELETE route to admins only
    .delete("vehicle-specifications/:id", adminRoleAuth, deleteVehicleSpecificationController);

export default vehicleSpecificationRouter;
