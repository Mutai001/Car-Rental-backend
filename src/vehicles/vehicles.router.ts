import { Hono } from "hono";
import { 
    deleteVehicle, 
    getVehicleById, 
    insertVehicle, 
    listAllVehicles, 
    updateVehicle 
} from "./vehicles.controller";
import { createVehicleValidator, updateVehicleValidator } from '../validators/vehiclesValidator';
import { zValidator } from "@hono/zod-validator";

export const vehiclesRouter = new Hono();

// Get all vehicles
vehiclesRouter.get('/vehicles', listAllVehicles);

// Get vehicle by ID
vehiclesRouter.get('/vehicle/:id', getVehicleById);

// Insert vehicle
vehiclesRouter.post('/vehicles', zValidator('json', createVehicleValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertVehicle);

// Update vehicle
vehiclesRouter.put('/vehicles/:id', zValidator('json', updateVehicleValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), updateVehicle);

// Delete vehicle
vehiclesRouter.delete('/vehicles/:id', deleteVehicle);
