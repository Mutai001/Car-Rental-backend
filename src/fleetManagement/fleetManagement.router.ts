import { Hono } from "hono";
import { 
    deleteFleetManagementRecord, 
    getFleetManagementRecordById, 
    insertFleetManagementRecord, 
    listAllFleetManagementRecords, 
    updateFleetManagementRecord 
} from "./fleetManagement.controller";
import { createFleetManagementValidator, updateFleetManagementValidator } from '../validators/fleetManagementValidator';
import { zValidator } from "@hono/zod-validator";

export const fleetManagementRouter = new Hono();

// Get all fleet management records
fleetManagementRouter.get('/fleet-management', listAllFleetManagementRecords);

// Get fleet management record by ID
fleetManagementRouter.get('/fleet-management/:id', getFleetManagementRecordById);

// Insert fleet management record
fleetManagementRouter.post('/fleet-management', zValidator('json', createFleetManagementValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertFleetManagementRecord);

// Update fleet management record
fleetManagementRouter.put('/fleet-management/:id', zValidator('json', updateFleetManagementValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), updateFleetManagementRecord);

// Delete fleet management record
fleetManagementRouter.delete('/fleet-management/:id', deleteFleetManagementRecord);
