"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesRouter = void 0;
const hono_1 = require("hono");
const vehicles_controller_1 = require("./vehicles.controller");
const vehiclesValidator_1 = require("../validators/vehiclesValidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.vehiclesRouter = new hono_1.Hono();
// Get all vehicles
exports.vehiclesRouter.get('/vehicles', vehicles_controller_1.listAllVehicles);
// Get vehicle by ID
exports.vehiclesRouter.get('/vehicle/:id', vehicles_controller_1.getVehicleById);
// Insert vehicle
exports.vehiclesRouter.post('/vehicles', (0, zod_validator_1.zValidator)('json', vehiclesValidator_1.createVehicleValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), vehicles_controller_1.insertVehicle);
// Update vehicle
exports.vehiclesRouter.put('/vehicles/:id', (0, zod_validator_1.zValidator)('json', vehiclesValidator_1.updateVehicleValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), vehicles_controller_1.updateVehicle);
// Delete vehicle
exports.vehiclesRouter.delete('/vehicles/:id', vehicles_controller_1.deleteVehicle);
