"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRouter = void 0;
const hono_1 = require("hono");
const fleetManagement_controller_1 = require("./fleetManagement.controller");
const fleetManagementValidator_1 = require("../validators/fleetManagementValidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.fleetManagementRouter = new hono_1.Hono();
// Get all fleet management records
exports.fleetManagementRouter.get('/fleet-management', fleetManagement_controller_1.listAllFleetManagementRecords);
// Get fleet management record by ID
exports.fleetManagementRouter.get('/fleet-management/:id', fleetManagement_controller_1.getFleetManagementRecordById);
// Insert fleet management record
exports.fleetManagementRouter.post('/fleet-management', (0, zod_validator_1.zValidator)('json', fleetManagementValidator_1.createFleetManagementValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), fleetManagement_controller_1.insertFleetManagementRecord);
// Update fleet management record
exports.fleetManagementRouter.put('/fleet-management/:id', (0, zod_validator_1.zValidator)('json', fleetManagementValidator_1.updateFleetManagementValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), fleetManagement_controller_1.updateFleetManagementRecord);
// Delete fleet management record
exports.fleetManagementRouter.delete('/fleet-management/:id', fleetManagement_controller_1.deleteFleetManagementRecord);
