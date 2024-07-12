"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.insertLocation = exports.getLocationById = exports.listAllLocations = void 0;
const locations_service_1 = require("./locations.service");
// List all locations
const listAllLocations = async (c) => {
    try {
        const locations = await (0, locations_service_1.locationsService)();
        if (locations === null)
            return c.text("No locations found");
        return c.json(locations, 200);
    }
    catch (error) {
        return c.text("Error while fetching locations", 400);
    }
};
exports.listAllLocations = listAllLocations;
// Get location by ID
// export const getLocationById = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     try {
//         if (isNaN(id)) return c.text("Invalid ID", 400);
//         const location = await getLocationByIdService(id);
//         if (location === undefined) return c.text("Location not found! 😒", 404);
//         return c.json(location, 200);
//     } catch (error: any) {
//         return c.text(error?.message, 400);
//     }
// }
const getLocationById = async (c) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const location = await (0, locations_service_1.getLocationByIdService)(id);
        if (!location)
            return c.text("Location not found! ", 404);
        return c.json(location, 200);
    }
    catch (error) {
        console.error("Error fetching location:", error); // Log the error for debugging
        return c.text("An error occurred. Please try again later.", 500); // Generic error message for user
    }
};
exports.getLocationById = getLocationById;
// Insert location
const insertLocation = async (c) => {
    try {
        const location = await c.req.json();
        const createdLocation = await (0, locations_service_1.insertLocationService)(location);
        if (createdLocation === undefined) {
            return c.text("Error while inserting location", 400);
        }
        return c.json(createdLocation, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertLocation = insertLocation;
// Update location
const updateLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const location = await c.req.json();
    try {
        const existingLocation = await (0, locations_service_1.getLocationByIdService)(id);
        if (existingLocation === undefined)
            return c.text("Location not found", 404);
        const updatedLocation = await (0, locations_service_1.updateLocationService)(id, location);
        if (!updatedLocation)
            return c.text("Error while updating location", 400);
        return c.json({ msg: updatedLocation }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateLocation = updateLocation;
// Delete location
const deleteLocation = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const existingLocation = await (0, locations_service_1.getLocationByIdService)(id);
        if (existingLocation === undefined)
            return c.text("Location not found", 404);
        const deletedLocation = await (0, locations_service_1.deleteLocationService)(id);
        return c.json({ msg: deletedLocation }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteLocation = deleteLocation;
