"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecificationController = exports.updateVehicleSpecificationController = exports.createVehicleSpecificationController = exports.getVehicleSpecificationByIdController = exports.getVehicleSpecificationsController = void 0;
const Vehiclespeciication_Service_1 = require("./Vehiclespeciication.Service");
// GET ALL VEHICLE SPECIFICATIONS
const getVehicleSpecificationsController = async (c) => {
    try {
        const vehicleSpecs = await (0, Vehiclespeciication_Service_1.getVehicleSpecificationsService)();
        if (!vehicleSpecs || vehicleSpecs.length === 0) {
            return c.text("No vehicle specifications found", 404);
        }
        return c.json(vehicleSpecs, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getVehicleSpecificationsController = getVehicleSpecificationsController;
// GET VEHICLE SPECIFICATION BY ID
const getVehicleSpecificationByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const vehicleSpec = await (0, Vehiclespeciication_Service_1.getVehicleSpecificationByIdService)(id);
        if (!vehicleSpec) {
            return c.text("Vehicle specification not found", 404);
        }
        return c.json(vehicleSpec, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getVehicleSpecificationByIdController = getVehicleSpecificationByIdController;
// CREATE VEHICLE SPECIFICATION
const createVehicleSpecificationController = async (c) => {
    try {
        const vehicleSpec = await c.req.json();
        const result = await (0, Vehiclespeciication_Service_1.createVehicleSpecificationService)(vehicleSpec);
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createVehicleSpecificationController = createVehicleSpecificationController;
// UPDATE VEHICLE SPECIFICATION
const updateVehicleSpecificationController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const vehicleSpec = await c.req.json();
        const result = await (0, Vehiclespeciication_Service_1.updateVehicleSpecificationService)(id, vehicleSpec);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateVehicleSpecificationController = updateVehicleSpecificationController;
// DELETE VEHICLE SPECIFICATION
const deleteVehicleSpecificationController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const result = await (0, Vehiclespeciication_Service_1.deleteVehicleSpecificationService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteVehicleSpecificationController = deleteVehicleSpecificationController;
