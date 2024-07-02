import { Context } from "hono";
import { 
    fleetManagementService, 
    deleteFleetManagementService, 
    getFleetManagementByIdService, 
    insertFleetManagementService, 
    updateFleetManagementService 
} from "./fleetManagement.service";

// List all fleet management records
export const listAllFleetManagementRecords = async (c: Context) => {
    try {
        const records = await fleetManagementService();
        if (records === null) return c.text("No fleet management records found");
        return c.json(records, 200);
    } catch (error: any) {
        return c.text("Error while fetching fleet management records", 400);
    }
}

// Get fleet management record by ID
export const getFleetManagementRecordById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const record = await getFleetManagementByIdService(id);
        if (record === undefined) return c.text("Fleet management record not found 😒", 404);
        return c.json(record, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Insert fleet management record
export const insertFleetManagementRecord = async (c: Context) => {
    try {
        const record = await c.req.json();
        const createdRecord = await insertFleetManagementService(record);
        if (createdRecord === undefined) {
            return c.text("Error while inserting fleet management record", 400);
        }
        return c.json(createdRecord, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Update fleet management record
export const updateFleetManagementRecord = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const record = await c.req.json();
    try {
        const existingRecord = await getFleetManagementByIdService(id);
        if (existingRecord === undefined) return c.text("Fleet management record not found", 404);
        const updatedRecord = await updateFleetManagementService(id, record);
        if (!updatedRecord) return c.text("Error while updating fleet management record", 400);
        return c.json({ msg: updatedRecord }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

// Delete fleet management record
export const deleteFleetManagementRecord = async (c: Context) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        const existingRecord = await getFleetManagementByIdService(id);
        if (existingRecord === undefined) return c.text("Fleet management record not found", 404);
        const deletedRecord = await deleteFleetManagementService(id);
        return c.json({ msg: deletedRecord }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}
