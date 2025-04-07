"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationRouter = void 0;
const hono_1 = require("hono");
const Vehiclespecication_controller_1 = require("./Vehiclespecication.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
// import { adminRoleAuth, userRoleAuth, bothRoleAuth } from '../middlewares/auth.middlewares';
exports.vehicleSpecificationRouter = new hono_1.Hono();
// GET ALL VEHICLE SPECIFICATIONS - accessible by users and admins
exports.vehicleSpecificationRouter
    .get("vehicle-specifications", 
//  bothRoleAuth,
Vehiclespecication_controller_1.getVehicleSpecificationsController)
    .post("vehicle-specifications", (0, zod_validator_1.zValidator)('json', validator_1.vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), 
// adminRoleAuth, 
Vehiclespecication_controller_1.createVehicleSpecificationController);
// GET VEHICLE SPECIFICATION BY ID - accessible by both users and admins
exports.vehicleSpecificationRouter
    .get("vehicle-specifications/:id", 
// bothRoleAuth,
Vehiclespecication_controller_1.getVehicleSpecificationByIdController)
    .put("vehicle-specifications/:id", (0, zod_validator_1.zValidator)('json', validator_1.vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), 
// adminRoleAuth,
Vehiclespecication_controller_1.updateVehicleSpecificationController)
    // Restrict DELETE route to admins only
    .delete("vehicle-specifications/:id", 
//  adminRoleAuth, 
Vehiclespecication_controller_1.deleteVehicleSpecificationController);
exports.default = exports.vehicleSpecificationRouter;
