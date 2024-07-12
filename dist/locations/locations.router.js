"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationsRouter = void 0;
const hono_1 = require("hono");
const locations_controllers_1 = require("./locations.controllers");
const locationsValidator_1 = require("../validators/locationsValidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.locationsRouter = new hono_1.Hono();
// Get all locations
exports.locationsRouter.get('/locations', locations_controllers_1.listAllLocations);
// Get location by ID
exports.locationsRouter.get('/location/:id', locations_controllers_1.getLocationById);
// Insert location
exports.locationsRouter.post('/locations', (0, zod_validator_1.zValidator)('json', locationsValidator_1.createLocationValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), locations_controllers_1.insertLocation);
// Update location
exports.locationsRouter.put('/locations/:id', (0, zod_validator_1.zValidator)('json', locationsValidator_1.updateLocationValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), locations_controllers_1.updateLocation);
// Delete location
exports.locationsRouter.delete('/locations/:id', locations_controllers_1.deleteLocation);
