"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementRecord = exports.updateFleetManagementRecord = exports.insertFleetManagementRecord = exports.getFleetManagementRecordById = exports.listAllFleetManagementRecords = void 0;
const fleetManagement_service_1 = require("./fleetManagement.service");
// List all fleet management records
const listAllFleetManagementRecords = async (c) => {
    try {
        const records = await (0, fleetManagement_service_1.fleetManagementService)();
        if (records === null)
            return c.text("No fleet management records found");
        return c.json(records, 200);
    }
    catch (error) {
        return c.text("Error while fetching fleet management records", 400);
    }
};
exports.listAllFleetManagementRecords = listAllFleetManagementRecords;
// Get fleet management record by ID
const getFleetManagementRecordById = async (c) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const record = await (0, fleetManagement_service_1.getFleetManagementByIdService)(id);
        if (record === undefined)
            return c.text("Fleet management record not found 😒", 404);
        return c.json(record, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getFleetManagementRecordById = getFleetManagementRecordById;
// Insert fleet management record
const insertFleetManagementRecord = async (c) => {
    try {
        const record = await c.req.json();
        const createdRecord = await (0, fleetManagement_service_1.insertFleetManagementService)(record);
        if (createdRecord === undefined) {
            return c.text("Error while inserting fleet management record", 400);
        }
        return c.json(createdRecord, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertFleetManagementRecord = insertFleetManagementRecord;
// Update fleet management record
const updateFleetManagementRecord = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const record = await c.req.json();
    try {
        const existingRecord = await (0, fleetManagement_service_1.getFleetManagementByIdService)(id);
        if (existingRecord === undefined)
            return c.text("Fleet management record not found", 404);
        const updatedRecord = await (0, fleetManagement_service_1.updateFleetManagementService)(id, record);
        if (!updatedRecord)
            return c.text("Error while updating fleet management record", 400);
        return c.json({ msg: updatedRecord }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateFleetManagementRecord = updateFleetManagementRecord;
// Delete fleet management record
const deleteFleetManagementRecord = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const existingRecord = await (0, fleetManagement_service_1.getFleetManagementByIdService)(id);
        if (existingRecord === undefined)
            return c.text("Fleet management record not found", 404);
        const deletedRecord = await (0, fleetManagement_service_1.deleteFleetManagementService)(id);
        return c.json({ msg: deletedRecord }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteFleetManagementRecord = deleteFleetManagementRecord;
