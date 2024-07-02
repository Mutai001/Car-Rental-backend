import { Context } from "hono";
import { 
    locationsService, 
    deleteLocationService, 
    getLocationByIdService, 
    insertLocationService, 
    updateLocationService 
} from "./locations.service";

// List all locations
export const listAllLocations = async (c: Context) => {
    try {
        const locations = await locationsService();
        if (locations === null) return c.text("No locations found");
        return c.json(locations, 200);
    } catch (error: any) {
        return c.text("Error while fetching locations", 400);
    }
}

// Get location by ID
export const getLocationById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const location = await getLocationByIdService(id);
        if (location === undefined) return c.text("Location not found 😒", 404);
        return c.json(location, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert location
export const insertLocation = async (c: Context) => {
    try {
        const location = await c.req.json();
        const createdLocation = await insertLocationService(location);
        if (createdLocation === undefined) {
            return c.text("Error while inserting location", 400);
        }
        return c.json(createdLocation, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update location
export const updateLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const location = await c.req.json();
    try {
        const existingLocation = await getLocationByIdService(id);
        if (existingLocation === undefined) return c.text("Location not found", 404);
        const updatedLocation = await updateLocationService(id, location);
        if (!updatedLocation) return c.text("Error while updating location", 400);
        return c.json({ msg: updatedLocation }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete location
export const deleteLocation = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingLocation = await getLocationByIdService(id);
        if (existingLocation === undefined) return c.text("Location not found", 404);
        const deletedLocation = await deleteLocationService(id);
        return c.json({ msg: deletedLocation }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
