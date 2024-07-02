import { Context } from "hono";
import { 
    vehiclesService, 
    deleteVehicleService, 
    getVehicleByIdService, 
    insertVehicleService, 
    updateVehicleService 
} from "./vehicles.service";

// List all vehicles
export const listAllVehicles = async (c: Context) => {
    try {
        const vehicles = await vehiclesService();
        if (vehicles === null) return c.text("No vehicles found");
        return c.json(vehicles, 200);
    } catch (error: any) {
        return c.text("Error while fetching vehicles", 400);
    }
}

// Get vehicle by ID
export const getVehicleById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const vehicle = await getVehicleByIdService(id);
        if (vehicle === undefined) return c.text("Vehicle not found 😒", 404);
        return c.json(vehicle, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert vehicle
export const insertVehicle = async (c: Context) => {
    try {
        const vehicle = await c.req.json();
        const createdVehicle = await insertVehicleService(vehicle);
        if (createdVehicle === undefined) {
            return c.text("Error while inserting vehicle", 400);
        }
        return c.json(createdVehicle, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update vehicle
export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const vehicle = await c.req.json();
    try {
        const existingVehicle = await getVehicleByIdService(id);
        if (existingVehicle === undefined) return c.text("Vehicle not found", 404);
        const updatedVehicle = await updateVehicleService(id, vehicle);
        if (!updatedVehicle) return c.text("Error while updating vehicle", 400);
        return c.json({ msg: updatedVehicle }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete vehicle
export const deleteVehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingVehicle = await getVehicleByIdService(id);
        if (existingVehicle === undefined) return c.text("Vehicle not found", 404);
        const deletedVehicle = await deleteVehicleService(id);
        return c.json({ msg: deletedVehicle }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
