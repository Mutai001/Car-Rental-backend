"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecification = exports.updateVehicleSpecification = exports.insertVehicleSpecification = exports.getVehicleSpecificationById = exports.listAllVehicleSpecifications = void 0;
const vehicleSpecifications_service_1 = require("./vehicleSpecifications.service");
// List all vehicle specifications
const listAllVehicleSpecifications = async (c) => {
    try {
        const vehicleSpecifications = await (0, vehicleSpecifications_service_1.vehicleSpecificationsService)();
        if (vehicleSpecifications === null)
            return c.text("No vehicle specifications found");
        return c.json(vehicleSpecifications, 200);
    }
    catch (error) {
        return c.text("Error while fetching vehicle specifications", 400);
    }
};
exports.listAllVehicleSpecifications = listAllVehicleSpecifications;
// Get vehicle specification by ID
const getVehicleSpecificationById = async (c) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const vehicleSpecification = await (0, vehicleSpecifications_service_1.getVehicleSpecificationByIdService)(id);
        if (vehicleSpecification === undefined)
            return c.text("Vehicle specification not found 😒", 404);
        return c.json(vehicleSpecification, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getVehicleSpecificationById = getVehicleSpecificationById;
// Insert vehicle specification
const insertVehicleSpecification = async (c) => {
    try {
        const vehicleSpecification = await c.req.json();
        const createdVehicleSpecification = await (0, vehicleSpecifications_service_1.insertVehicleSpecificationService)(vehicleSpecification);
        if (createdVehicleSpecification === undefined) {
            return c.text("Error while inserting vehicle specification", 400);
        }
        return c.json(createdVehicleSpecification, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertVehicleSpecification = insertVehicleSpecification;
// Update vehicle specification
const updateVehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpecification = await c.req.json();
    try {
        const existingVehicleSpecification = await (0, vehicleSpecifications_service_1.getVehicleSpecificationByIdService)(id);
        if (existingVehicleSpecification === undefined)
            return c.text("Vehicle specification not found", 404);
        const updatedVehicleSpecification = await (0, vehicleSpecifications_service_1.updateVehicleSpecificationService)(id, vehicleSpecification);
        if (!updatedVehicleSpecification)
            return c.text("Error while updating vehicle specification", 400);
        return c.json({ msg: updatedVehicleSpecification }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateVehicleSpecification = updateVehicleSpecification;
// Delete vehicle specification
const deleteVehicleSpecification = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const existingVehicleSpecification = await (0, vehicleSpecifications_service_1.getVehicleSpecificationByIdService)(id);
        if (existingVehicleSpecification === undefined)
            return c.text("Vehicle specification not found", 404);
        const deletedVehicleSpecification = await (0, vehicleSpecifications_service_1.deleteVehicleSpecificationService)(id);
        return c.json({ msg: deletedVehicleSpecification }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteVehicleSpecification = deleteVehicleSpecification;
