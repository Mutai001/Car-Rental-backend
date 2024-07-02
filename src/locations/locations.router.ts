import { Hono } from "hono";
import { 
    deleteLocation, 
    getLocationById, 
    insertLocation, 
    listAllLocations, 
    updateLocation 
} from "./locations.controllers";
import { createLocationValidator, updateLocationValidator } from '../validators/locationsValidator';
import { zValidator } from "@hono/zod-validator";

export const locationsRouter = new Hono();

// Get all locations
locationsRouter.get('/locations', listAllLocations);

// Get location by ID
locationsRouter.get('/location/:id', getLocationById);

// Insert location
locationsRouter.post('/locations', zValidator('json', createLocationValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), insertLocation);

// Update location
locationsRouter.put('/locations/:id', zValidator('json', updateLocationValidator, (result, c) => {
    if (!result.success) return c.text(result.error.message + "😒", 400)
}), updateLocation);

// Delete location
locationsRouter.delete('/locations/:id', deleteLocation);
