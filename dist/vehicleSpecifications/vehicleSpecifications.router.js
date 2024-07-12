"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationsRouter = void 0;
const hono_1 = require("hono");
const vehicleSpecifications_controller_1 = require("./vehicleSpecifications.controller");
const vehicleSpecificationValidator_1 = require("../validators/vehicleSpecificationValidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.vehicleSpecificationsRouter = new hono_1.Hono();
// Get all vehicle specifications
exports.vehicleSpecificationsRouter.get('/vehicle-specifications', vehicleSpecifications_controller_1.listAllVehicleSpecifications);
// Get vehicle specification by ID
exports.vehicleSpecificationsRouter.get('/vehicle-specification/:id', vehicleSpecifications_controller_1.getVehicleSpecificationById);
// Insert vehicle specification
exports.vehicleSpecificationsRouter.post('/vehicle-specifications', (0, zod_validator_1.zValidator)('json', vehicleSpecificationValidator_1.createVehicleSpecificationValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), vehicleSpecifications_controller_1.insertVehicleSpecification);
// Update vehicle specification
exports.vehicleSpecificationsRouter.put('/vehicle-specifications/:id', vehicleSpecifications_controller_1.updateVehicleSpecification);
// Delete vehicle specification
exports.vehicleSpecificationsRouter.delete('/vehicle-specifications/:id', vehicleSpecifications_controller_1.deleteVehicleSpecification);
