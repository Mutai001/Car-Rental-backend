"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationController = exports.updateLocationController = exports.createLocationController = exports.getLocationByIdController = exports.getAllLocationsController = void 0;
const Location_service_1 = require("./Location.service");
// Get all locations
const getAllLocationsController = async (c) => {
    try {
        const locations = await (0, Location_service_1.getAllLocationsService)();
        if (!locations || locations.length === 0) {
            return c.text("No locations found", 404);
        }
        return c.json(locations, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAllLocationsController = getAllLocationsController;
// Get location by ID
const getLocationByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const location = await (0, Location_service_1.getLocationByIdService)(id);
        if (!location) {
            return c.text("Location not found", 404);
        }
        return c.json(location, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getLocationByIdController = getLocationByIdController;
// Create location
const createLocationController = async (c) => {
    try {
        const location = await c.req.json();
        const newLocation = await (0, Location_service_1.createLocationService)(location);
        if (!newLocation) {
            return c.text("Location not created", 400);
        }
        return c.json({ message: "Location created successfully" }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createLocationController = createLocationController;
// Update location
const updateLocationController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const location = await c.req.json();
        const updatedLocation = await (0, Location_service_1.updateLocationService)(id, location);
        if (!updatedLocation) {
            return c.text("Location not updated", 400);
        }
        return c.json({ message: "Location updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateLocationController = updateLocationController;
// Delete location
const deleteLocationController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const deletedLocation = await (0, Location_service_1.deleteLocationService)(id);
        if (!deletedLocation) {
            return c.text("Location not deleted", 400);
        }
        return c.json({ message: "Location deleted successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteLocationController = deleteLocationController;
