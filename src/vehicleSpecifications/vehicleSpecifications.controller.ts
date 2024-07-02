import { Context } from "hono";
import { 
    vehicleSpecificationsService, 
    deleteVehicleSpecificationService, 
    getVehicleSpecificationByIdService, 
    insertVehicleSpecificationService, 
    updateVehicleSpecificationService 
} from "./vehicleSpecifications.service";

// List all vehicle specifications
export const listAllVehicleSpecifications = async (c: Context) => {
    try {
        const vehicleSpecifications = await vehicleSpecificationsService();
        if (vehicleSpecifications === null) return c.text("No vehicle specifications found");
        return c.json(vehicleSpecifications, 200);
    } catch (error: any) {
        return c.text("Error while fetching vehicle specifications", 400);
    }
}

// Get vehicle specification by ID
export const getVehicleSpecificationById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const vehicleSpecification = await getVehicleSpecificationByIdService(id);
        if (vehicleSpecification === undefined) return c.text("Vehicle specification not found 😒", 404);
        return c.json(vehicleSpecification, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert vehicle specification
export const insertVehicleSpecification = async (c: Context) => {
    try {
        const vehicleSpecification = await c.req.json();
        const createdVehicleSpecification = await insertVehicleSpecificationService(vehicleSpecification);
        if (createdVehicleSpecification === undefined) {
            return c.text("Error while inserting vehicle specification", 400);
        }
        return c.json(createdVehicleSpecification, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update vehicle specification
export const updateVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const vehicleSpecification = await c.req.json();
    try {
        const existingVehicleSpecification = await getVehicleSpecificationByIdService(id);
        if (existingVehicleSpecification === undefined) return c.text("Vehicle specification not found", 404);
        const updatedVehicleSpecification = await updateVehicleSpecificationService(id, vehicleSpecification);
        if (!updatedVehicleSpecification) return c.text("Error while updating vehicle specification", 400);
        return c.json({ msg: updatedVehicleSpecification }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete vehicle specification
export const deleteVehicleSpecification = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingVehicleSpecification = await getVehicleSpecificationByIdService(id);
        if (existingVehicleSpecification === undefined) return c.text("Vehicle specification not found", 404);
        const deletedVehicleSpecification = await deleteVehicleSpecificationService(id);
        return c.json({ msg: deletedVehicleSpecification }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
