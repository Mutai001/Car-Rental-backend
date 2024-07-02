import { Hono } from "hono";
import { 
    deleteVehicleSpecification, 
    getVehicleSpecificationById, 
    insertVehicleSpecification, 
    listAllVehicleSpecifications, 
    updateVehicleSpecification 
} from "./vehicleSpecifications.controller";
import { createVehicleSpecificationValidator } from '../validators/vehicleSpecificationValidator';
import { zValidator } from "@hono/zod-validator";

export const vehicleSpecificationsRouter = new Hono();

// Get all vehicle specifications
vehicleSpecificationsRouter.get('/vehicle-specifications', listAllVehicleSpecifications);

// Get vehicle specification by ID
vehicleSpecificationsRouter.get('/vehicle-specification/:id', getVehicleSpecificationById);

// Insert vehicle specification
vehicleSpecificationsRouter.post('/vehicle-specifications', zValidator('json', createVehicleSpecificationValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertVehicleSpecification);

// Update vehicle specification
vehicleSpecificationsRouter.put('/vehicle-specifications/:id', updateVehicleSpecification);

// Delete vehicle specification
vehicleSpecificationsRouter.delete('/vehicle-specifications/:id', deleteVehicleSpecification);
