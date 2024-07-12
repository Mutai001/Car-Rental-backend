"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleController = exports.updateVehicleController = exports.createVehicleController = exports.getVehicleByIdController = exports.getAllVehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
// Get all vehicles
const getAllVehiclesController = async (c) => {
    try {
        const vehicles = await (0, vehicles_service_1.getAllVehiclesService)();
        if (!vehicles || vehicles.length === 0) {
            return c.text("No vehicles found", 404);
        }
        return c.json(vehicles, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAllVehiclesController = getAllVehiclesController;
// Get vehicle by ID
const getVehicleByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const vehicle = await (0, vehicles_service_1.getVehicleByIdService)(id);
        if (!vehicle) {
            return c.text("Vehicle not found", 404);
        }
        return c.json(vehicle, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getVehicleByIdController = getVehicleByIdController;
// Create vehicle
const createVehicleController = async (c) => {
    try {
        const vehicle = await c.req.json();
        const newVehicle = await (0, vehicles_service_1.createVehicleService)(vehicle);
        if (!newVehicle) {
            return c.text("Vehicle not created", 400);
        }
        return c.json({ message: "Vehicle created successfully" }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createVehicleController = createVehicleController;
// Update vehicle
const updateVehicleController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const vehicle = await c.req.json();
        const updatedVehicle = await (0, vehicles_service_1.updateVehicleService)(id, vehicle);
        if (!updatedVehicle) {
            return c.text("Vehicle not updated", 400);
        }
        return c.json({ message: "Vehicle updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateVehicleController = updateVehicleController;
// Delete vehicle
const deleteVehicleController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const deletedVehicle = await (0, vehicles_service_1.deleteVehicleService)(id);
        if (!deletedVehicle) {
            return c.text("Vehicle not deleted", 400);
        }
        return c.json({ message: "Vehicle deleted successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteVehicleController = deleteVehicleController;
