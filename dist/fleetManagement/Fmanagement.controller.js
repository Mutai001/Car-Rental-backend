"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementController = exports.updateFleetManagementController = exports.createFleetManagementController = exports.getFleetManagementByIdController = exports.getAllFleetManagementController = void 0;
const Fmanagement_service_1 = require("./Fmanagement.service");
// Get all fleet management entries
const getAllFleetManagementController = async (c) => {
    try {
        const fleetManagement = await (0, Fmanagement_service_1.getAllFleetManagementService)();
        if (!fleetManagement || fleetManagement.length === 0) {
            return c.text("No fleet management entries found", 404);
        }
        return c.json(fleetManagement, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAllFleetManagementController = getAllFleetManagementController;
// Get fleet management entry by ID
const getFleetManagementByIdController = async (c) => {
    try {
        const fleet_id = parseInt(c.req.param("id"));
        if (isNaN(fleet_id)) {
            return c.text("Invalid fleet ID", 400);
        }
        const fleetManagement = await (0, Fmanagement_service_1.getFleetManagementByIdService)(fleet_id);
        if (!fleetManagement) {
            return c.text("Fleet management entry not found", 404);
        }
        return c.json(fleetManagement, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getFleetManagementByIdController = getFleetManagementByIdController;
// Create fleet management entry
const createFleetManagementController = async (c) => {
    try {
        const fleetManagement = await c.req.json();
        const newFleetManagement = await (0, Fmanagement_service_1.createFleetManagementService)(fleetManagement);
        if (!newFleetManagement) {
            return c.text("Fleet management entry not created", 400);
        }
        return c.json({ message: "Fleet management entry created successfully" }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createFleetManagementController = createFleetManagementController;
// Update fleet management entry
const updateFleetManagementController = async (c) => {
    try {
        const fleet_id = parseInt(c.req.param("id"));
        if (isNaN(fleet_id)) {
            return c.text("Invalid fleet ID", 400);
        }
        const fleetManagement = await c.req.json();
        const updatedFleetManagement = await (0, Fmanagement_service_1.updateFleetManagementService)(fleet_id, fleetManagement);
        if (!updatedFleetManagement) {
            return c.text("Fleet management entry not updated", 400);
        }
        return c.json({ message: "Fleet management entry updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateFleetManagementController = updateFleetManagementController;
// Delete fleet management entry
const deleteFleetManagementController = async (c) => {
    try {
        const fleet_id = parseInt(c.req.param("id"));
        if (isNaN(fleet_id)) {
            return c.text("Invalid fleet ID", 400);
        }
        const deletedFleetManagement = await (0, Fmanagement_service_1.deleteFleetManagementService)(fleet_id);
        if (!deletedFleetManagement) {
            return c.text("Fleet management entry not deleted", 400);
        }
        return c.json({ message: "Fleet management entry deleted successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteFleetManagementController = deleteFleetManagementController;
